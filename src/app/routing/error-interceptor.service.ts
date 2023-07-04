import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, take, map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { environment } from '@env/environment';
import { TranslationService } from '@services/translation.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {

  private destroyRef = inject(DestroyRef);

  constructor(
    private translationService: TranslationService,
    private toastController: ToastController
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          if (!environment.production) { console.log(errorMsg); }

          let errorTranslation = '';
          if (error.status === 500) {
            errorTranslation = 'W1278';
          }

          if (typeof errorTranslation === 'string' && errorTranslation.length > 0) {
            this.translationService.getTranslation$(errorTranslation).pipe(
              take(1),
              map(async translationData => {
                const toast = await this.toastController.create({
                  duration: 2000,
                  message: translationData,
                  color: 'danger'
                });
                toast.present();
              }),
              catchError(async () => {
                const toast = await this.toastController.create({
                  duration: 2000,
                  message: errorMsg,
                  color: 'danger'
                });
                toast.present();
              }),
              takeUntilDestroyed(this.destroyRef)
            );
          }

          return throwError(errorMsg);
        })
      );
  }
}
