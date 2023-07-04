import { DestroyRef, inject, Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { delay, take, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateHotToastRef, DefaultDataType, HotToastService, ToastOptions as HotToastOptions } from '@ngneat/hot-toast';
import { isElement as _isElement, uniq as _uniq } from 'lodash-es';

import { TranslationService } from '@services/translation.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  private destroyRef = inject(DestroyRef);

  private defaultConfig: HotToastOptions<DefaultDataType> = {
    // dismissible: true,
    position: 'bottom-center',
  };

  private toastRefs: CreateHotToastRef<DefaultDataType>[] = [];

  constructor(
    private translationService: TranslationService,
    private hotToastService: HotToastService
  ) { }

  public closeAll() {
    for (const toastRef of this.toastRefs) {
      if (!toastRef) { continue; }
      toastRef.close();
    }
    this.toastRefs = this.toastRefs.filter(ref => !!ref);
  }

  public close(id: string) {
    for (const toastRef of this.toastRefs) {
      if (!toastRef) { continue; }
      const toast = toastRef.getToast();
      if (toast.id !== id) { continue; }
      toastRef.close();
    }
    this.toastRefs = this.toastRefs.filter(ref => !!ref);
  }

  public error(
    message: any,
    payload: HotToastOptions<DefaultDataType> = {},
    translationParams?: { [key: string]: string },
    waitFor: number = 0
  ): Promise<CreateHotToastRef<DefaultDataType>> {
    const toastConfig = {
      iconTheme: {
        primary: 'var(--danger-contrast)',
        secondary: 'var(--danger)',
      },
      dismissible: true,
      autoClose: false,
      ...payload
    };
    return this.show(message, toastConfig, translationParams, 'error', waitFor);
  }

  public warning(
    message: any,
    payload: HotToastOptions<DefaultDataType> = {},
    translationParams?: { [key: string]: string },
    waitFor: number = 0
  ): Promise<CreateHotToastRef<DefaultDataType>> {
    const toastConfig = {
      iconTheme: {
        primary: 'var(--warning-contrast)',
        secondary: 'var(--warning)',
      },
      ...payload
    };
    return this.show(message, toastConfig, translationParams, 'warning', waitFor);
  }

  public success(
    message: any,
    payload: HotToastOptions<DefaultDataType> = {},
    translationParams?: { [key: string]: string },
    waitFor: number = 0
  ): Promise<CreateHotToastRef<DefaultDataType>> {
    const toastConfig = {
      iconTheme: {
        primary: 'var(--success-contrast)',
        secondary: 'var(--success)',
      },
      ...payload
    };
    return this.show(message, toastConfig, translationParams, 'success', waitFor);
  }

  public show(
    message: any,
    payload: HotToastOptions<DefaultDataType> = {},
    translationParams?: { [key: string]: string },
    type?: string,
    waitFor: number = 0
  ): Promise<CreateHotToastRef<DefaultDataType>> {
    return new Promise(async resolve => {
      if (!message || message.length <= 0) {
        resolve(undefined);
        return;
      }

      const translationObservables: Observable<string>[] = [];
      if (typeof message === 'object' && Array.isArray(message)) {
        for (const messagePart of message) {
          if (typeof messagePart !== 'string') { continue; }
          translationObservables.push(this.translationService.getTranslation$(messagePart, translationParams));
        }
      } else if (typeof message === 'object' && typeof message.error === 'string') {
        translationObservables.push(this.translationService.getTranslation$(message.error, translationParams));
      } else if (typeof message === 'string') {
        translationObservables.push(this.translationService.getTranslation$(message, translationParams));
      }

      let classes = ['toast-box', 'toast-' + (type || 'default'), 'dci-toast'];
      if (payload.className && payload.className.length > 0) {
        classes.push(...payload.className.split(' '));
      }
      classes = _uniq(classes);

      const toastConfig: HotToastOptions<DefaultDataType> = {
        ...this.defaultConfig,
        ...payload,
        className: classes.join(' ')
      };

      combineLatest(translationObservables).pipe(
        take(1),
        map((translations: string[]) => translations.join('<br>')),
        delay(waitFor),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((messageString: string) => {
        let ref;
        if (type === 'error') {
          ref = this.hotToastService.error(messageString, toastConfig);
        } else if (type === 'warning') {
          ref = this.hotToastService.warning(messageString, toastConfig);
        } else if (type === 'success') {
          ref = this.hotToastService.success(messageString, toastConfig);
        } else {
          ref = this.hotToastService.show(messageString, {
            style: {
              border: '1px solid var(--border-color)',
            },
            ...toastConfig
          });
        }
        if (ref) { this.toastRefs.push(ref); }
        resolve(ref);
      });
    });
  }
}
