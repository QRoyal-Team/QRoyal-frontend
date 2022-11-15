import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  protected apiEndPoint: string = 'https://qroyal.herokuapp.com/api/';

  protected httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' }),
  };
  constructor(@Inject(String) protected url: string, protected http: HttpClient) {}

  public gets(pagination: any): Observable<ApiResponse<Pagination>> {
    return this.makeRequest('get', this.url + '/gets', pagination);
  }

  public get(id: number): Observable<ApiResponse<T>> {
    return this.mapAndCatchError(this.http.get<ApiResponse<T>>(`${this.apiEndPoint + this.url + 'get'}/${id}`, this.httpOptions));
  }

  public add(resource: T): Observable<ApiResponse<T>> {
    return this.mapAndCatchError(this.http.post<ApiResponse<T>>(this.apiEndPoint + this.url + 'create', resource, this.httpOptions));
  }

  protected makeRequest<TData>(method: string, url: string, data: any): Observable<ApiResponse<TData>> {
    let finalUrl: string = this.apiEndPoint + url;
    let body: any = null;
    if (method.toUpperCase() == 'GET') {
      finalUrl += '?' + this.objectToQueryString(data);
    } else {
      body = data;
    }
    return this.mapAndCatchError<TData>(
      this.http.request<ApiResponse<TData>>(method.toUpperCase(), finalUrl, { body: body, headers: this.httpOptions.headers })
    );
  }

  protected mapAndCatchError<TData>(response: Observable<ApiResponse<TData>>): Observable<ApiResponse<TData>> {
    return response.pipe(
      map((r: ApiResponse<TData>) => {
        var result = new ApiResponse<TData>();
        Object.assign(result, r);
        return result;
      }),
      catchError((err: HttpErrorResponse) => {
        var result = new ApiResponse<TData>();
        if (err.error instanceof ErrorEvent || err.error instanceof ProgressEvent) {
          result.errors.push({ code: ErrorCode.UnknownError, text: 'Unknown error.' });
        } else {
          Object.assign(result, err.error);
        }
        return of(result);
      })
    );
  }

  protected objectToQueryString(obj: any): string {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  }
}

export class ApiResponse<T> {
  constructor() {
    this.errors = [];
  }
  data: T | undefined;
  errors: ApiError[];
  error!: ApiError;
  getErrorsText(): string {
    return this.errors.map((e) => e.text).join(' ');
  }
  hasErrors(): boolean {
    return this.errors.length > 0;
  }
  hasError(): boolean {
    return this.error != null;
  }
}

export class ApiError {
  code: ErrorCode;
  text: string;

  constructor(code: ErrorCode, text: string) {
    this.code = code;
    this.text = text;
  }
}

export enum ErrorCode {
  UnknownError = 1,
  OrderIsOutdated = 2,
}
