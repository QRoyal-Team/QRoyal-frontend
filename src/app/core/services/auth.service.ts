import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { Jwt } from '../models/jwt';
import { User } from '../models/user';
import { ApiResponse, BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<Jwt> {
  user!: User;
  constructor(http: HttpClient) {
    super('auth/', http);
  }

  public login(account: Account): Observable<ApiResponse<Jwt>> {
    return this.mapAndCatchError(this.http.post<ApiResponse<Jwt>>(this.apiEndPoint + this.url + 'login', account, this.httpOptions));
  }

  public register(account: any): Observable<ApiResponse<any>> {
    return this.mapAndCatchError(this.http.post<ApiResponse<any>>(this.apiEndPoint + this.url + 'register', account, this.httpOptions));
  }

  public verify(account: any): Observable<ApiResponse<any>> {
    return this.mapAndCatchError(this.http.post<ApiResponse<any>>(this.apiEndPoint + this.url + 'verify', account, this.httpOptions));
  }

  public resend(account: any): Observable<ApiResponse<any>> {
    return this.mapAndCatchError(this.http.post<ApiResponse<any>>(this.apiEndPoint + this.url + 'resendOtp', account, this.httpOptions));
  }

  public logout(): void {
    localStorage.removeItem('jwt');
  }

  public saveToken(token: string): void {
    localStorage.removeItem('jwt');
    sessionStorage.removeItem('jwt');
    sessionStorage.setItem('jwt', token);
  }

  public rememberToken(token: string): void {
    sessionStorage.removeItem('jwt');
    localStorage.removeItem('jwt');
    localStorage.setItem('jwt', token);
  }

  public getUser(): User {
    var value = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    var Buffer = require('buffer/').Buffer;
    if (value !== null) {
      let token = JSON.parse(Buffer.from(value?.split('.')[1]!, 'base64').toString());
      this.user = token as User;
    }
    return this.user;
  }
}
