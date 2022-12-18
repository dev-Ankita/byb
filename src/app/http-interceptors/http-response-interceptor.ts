import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalstorageService } from '../service/localstorage.service';


@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private storage: LocalstorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(map((resp) => {
      if (resp instanceof HttpResponse) {
        if (resp.headers.has('bearertoken')) {
          const bearertoken = resp.headers.get('bearertoken');
          if (bearertoken != null) {
            this.storage.saveUserToken(bearertoken);
          }
        }
      };
      return resp;
    })
    );
  }

}
