import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable()
export class ApikeyInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (this.requestRequiresApikey(request) && environment?.apiKey) {
      request = request.clone({
        setHeaders: { 'x-api-key': environment.apiKey }
      });
    }

    return next.handle(request);
  }

  private requestRequiresApikey(request: HttpRequest<any>): boolean {
    if (!request.url.startsWith(environment.apiUrl)) { return false; }
    return true;
  }
}
