import { HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../service/localstorage.service';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private storage:LocalstorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.storage.getUserToken();
        if(token !=null && token!='')
        {
            let newHttpRequest = req.clone({
                setHeaders: {
                    Authorization : (token != null && token !== '')? ('Bearer ' + token) : ''
                }
            });
            return next.handle(newHttpRequest);
        }
       
        return next.handle(req);
    }

}
