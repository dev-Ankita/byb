import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './http-request-interceptor';
import { HttpResponseInterceptor } from './http-response-interceptor';
// Register the interceptors into httpInterceptorProviders
// N.B : The sequence of registering interceptor is important.
//       The interceptor will execute in the same sequence in which they are registered.
export const httpInterceptorProviders =
[
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true}
];


