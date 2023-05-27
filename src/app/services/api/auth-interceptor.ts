import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { environment } from '@env/environment';
import { AuthStoreFacade } from '@services/auth/+store/auth-store.facade';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authStoreFacade: AuthStoreFacade) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!this.requestRequiresToken(request)) {
      return next.handle(request);
    }

    return this.authStoreFacade.accessToken$.pipe(
      take(1),
      switchMap(token => {
        if (token && !request.headers.has('Authorization')) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
        }
        return next.handle(request);
      })
    );
  }

  private requestRequiresToken(request: HttpRequest<any>): boolean {
    if (request.headers.has('Authorization')) { return false; }
    if (!request.url.startsWith(environment.apiUrl)) { return false; }
    return true;
  }
}
