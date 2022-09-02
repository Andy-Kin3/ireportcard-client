import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, EMPTY, Observable, of, tap} from 'rxjs';
import {Message, MessageService} from "primeng/api";
import {LocalStorageUtil} from "../utils/local-storage.util";
import {Router} from "@angular/router";

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router, private msgService: MessageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.successfulResponseHandler(event);
        }
      }),
      catchError((err) => this.errorResponseHandler(err))
    );
  }

  successfulResponseHandler = (event: HttpResponse<any>): void => {
    try {
      const message: Message = {severity: 'success', summary: 'Success', detail: ''};
      if (event.status === 200 || event.status === 201) {
        message.detail = event.body == null ? '' : (event.body.message ? event.body.message : '');
      }
      if (event.status === 204) {
        message.severity = 'warn';
        message.summary = 'Deleted';
        message.detail = 'Deleted successfully'
      }

      const resBody = event.body;
      if ('log' in Object.keys(resBody) || !resBody.log) {
        return;
      }
      this.msgService.add(message);
    } catch (e: any) {
      console.log(event.url + ' : ' + event.status)
    }
  }

  private errorResponseHandler = (response: HttpErrorResponse) => {
    console.log(response)
    if (response) {
      if (response.error) {
        const error = response.error;
        const message: Message = {
          severity: 'error', summary: 'Error',
          detail: 'Something unexpected happened. Please file a report to the developers!'
        };
        if (error) {
          if (error.message) {
            message.detail = error.message
            if (response.status == 401) {
              message.detail = error.message ? error.message : 'You are not logged in!';
              this.router.navigate(['/auth/login']).then(() => LocalStorageUtil.deleteUserToken());
            }
          }
        }
        this.msgService.add(message);
        return of(error);
      }
    }
    return EMPTY;
  }
}
