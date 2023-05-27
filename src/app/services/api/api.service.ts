import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Observable, timer, throwError, of } from 'rxjs';
import { catchError, mergeMap, retryWhen } from 'rxjs/operators';

import { environment } from '@env/environment';
import { UtilService } from '@services/util.service';
import { ApiHttpParams } from './api-http-params.model';

export interface ApiErrorResponse {
  error: {
    errorcode: string;
    error: string;
    status: number;
    devmessage?: {
      class: string;
      code: number;
      message: string;
      location: string;
      line: number;
    };
  };
  headers: any;
  message: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
};

export const genericRetryStrategy = ({
  maxRetryAttempts = 1,
  scalingDuration = 3000,
  excludedStatusCodes = [401, 403, 500]
}: {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: number[];
} = {}) => (attempts: Observable<any>) => attempts.pipe(
  mergeMap((error, i) => {
    const retryAttempt = i + 1;
    if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find(e => e === error.status)) {
      return throwError(error);
    }
    // wait 5s, 10s, 15s, ...
    return timer(retryAttempt * scalingDuration);
  })
);

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  protected readonly baseUrl = environment.apiUrl;

  constructor(
    private utilService: UtilService,
    protected httpClient: HttpClient,
    private toastController: ToastController
  ) { }

  getFileUrl(
    endpoint: string,
    params: { [key: string]: any }
  ) {
    let httpParams = new HttpParams();
    for (const key of Object.keys(params)) {
      if (!params[key]) { continue; }
      const value = params[key];
      httpParams = httpParams.set(key, value);
    }
    return this.baseUrl + 'file/' + endpoint + '?' + httpParams.toString();
  }

  protected get(
    endpoint: string,
    params: ApiHttpParams = {},
    options: object = {},
    headers: {
      [name: string]: string;
    } = {}
  ): Observable<any> {
    options = Object.assign(options, {
      params, headers
    });

    return this.httpClient
      .get(endpoint, options)
      .pipe(
        retryWhen(genericRetryStrategy()),
        catchError(error => of(this.handleError(error)))
      );
  }

  protected put(
    endpoint: string,
    body: object = {},
    headers: {
      [name: string]: string;
    } = {}
  ): Observable<any> {
    const httpOptions = {
      headers
    };

    return this.httpClient
      .put(endpoint, body, httpOptions)
      .pipe(
        retryWhen(genericRetryStrategy()),
        catchError(error => of(this.handleError(error)))
      );
  }

  protected post(
    endpoint: string,
    body: object = {},
    headers: {
      [name: string]: string;
    } = {}
  ): Observable<any> {

    const httpOptions = {
      headers
    };

    return this.httpClient
      .post(endpoint, body, httpOptions)
      .pipe(
        retryWhen(genericRetryStrategy()),
        catchError(error => of(this.handleError(error)))
      );
  }

  protected delete(
    endpoint: string,
    body: object = {},
    headers: {
      [name: string]: string;
    } = {}
  ): Observable<any> {

    const httpOptions = {
      headers
    };

    return this.httpClient
      .delete(endpoint, httpOptions)
      .pipe(
        retryWhen(genericRetryStrategy()),
        catchError(error => of(this.handleError(error)))
      );
  }

  protected handleError(error: ApiErrorResponse) {
    if (!environment.production) { console.error('API Error: ', error); }

    throw error.error;
    return error.error;
  }

  protected sendForm(path: string, method: string, target: string, params: { [key: string]: any }): void {
    const tmpForm = document.createElement('form');
    tmpForm.setAttribute('action', path);
    tmpForm.setAttribute('method', method);
    tmpForm.setAttribute('target', target);

    for (const key in params) {
      if (!params[key]) { continue; }
      const param = params[key];

      const tmpInput = document.createElement('input');
      tmpInput.setAttribute('type', 'hidden');
      tmpInput.setAttribute('name', key);
      tmpInput.setAttribute('value', param);

      tmpForm.append(tmpInput);
    }

    document.body.appendChild(tmpForm);
    tmpForm.submit();

    // document.body.removeChild(tmpForm);
  }

  public getPage<T>(
    endpoint: string,
    params: ApiHttpParams = {},
    options: object = {},
    headers: {
      [name: string]: string;
    } = {}
  ): Observable<T> {
    return this.get(
      this.baseUrl + 'tpage' + (endpoint?.[0] !== '/' ? '/' : '') + endpoint,
      params,
      options,
      headers
    );
  }
}
