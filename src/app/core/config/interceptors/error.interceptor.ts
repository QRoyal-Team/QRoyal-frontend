import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }

  handleError(error: Error) {
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        console.log('No Internet Connection');
      } else {
        const status = error.status;
        console.log(status + ' ' + error.message);
        this.alertService.error(status + ' ' + error.message);
      }
    }

    console.error('Error occured: ', error);
  }
}
