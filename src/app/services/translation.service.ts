import { DestroyRef, Inject, Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, distinctUntilChanged, filter, debounceTime, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT, registerLocaleData } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { lowerCase as _lowerCase, find as _find } from 'lodash-es';

import localeEn from '@angular/common/locales/en';
import localeDe from '@angular/common/locales/de';

import { AppStateFacade } from '@store/app-state.facade';

export type SupportedLanguage = 'default' | 'de';
export const supportedLanguages = ['default', 'de'];

@Injectable({
  providedIn: 'root',
})
export class TranslationService {

  private destroyRef = inject(DestroyRef);

  public readonly languageLabels: { key: string; value: string }[] = [
    { key: 'de', value: 'Deutsch' }
  ];

  private _locale: string;
  set locale(value: string) {
    this._locale = value;
  }
  get locale(): string {
    return this._locale || 'default';
  }

  constructor(
    private ngxTranslateService: TranslateService,
    private appStateFacade: AppStateFacade,
    @Inject(DOCUMENT) private document
  ) {
    registerLocaleData(localeEn);
    registerLocaleData(localeDe);

    this.ngxTranslateService.setDefaultLang('de');
    this.ngxTranslateService.addLangs(['de']);

    this.appStateFacade.currentLanguage$.pipe(
      map(language => _lowerCase(language)),
      filter(language => supportedLanguages.indexOf(language) >= 0),
      debounceTime(200),
      distinctUntilChanged(),
      map(language => language === 'default' ? 'de' : language),
      switchMap(async language => {
        this.locale = language;
        this.ngxTranslateService.use(language);
        this.document.documentElement.lang = language;
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  isCurrentLanguage$(languageKey): Observable<boolean> {
    return this.appStateFacade.currentLanguage$.pipe(
      map(currentLanguage => currentLanguage === _lowerCase(languageKey))
    );
  }

  getTranslation$(key: string, params?: { [key: string]: string }): Observable<string> {
    if (typeof key !== 'string' || key.length <= 0) { return of(''); }
    return this.ngxTranslateService.get(key, params);
  }

  getTranslationForLang(key: string, language: string): string {
    if (!this.ngxTranslateService.translations) { return ''; }

    const translations = this.ngxTranslateService.translations[_lowerCase(language)];
    if (!translations) { return ''; }

    const translation = translations[key];
    if (!translation) { return ''; }
    return translation;
  }

  getTranslation(key: string): string {
    return this.getTranslationForLang(key, this._locale);
  }

  setTranslations(translationData: any, merge: boolean = false): void {
    if (!translationData || typeof translationData !== 'object') { return; }
    for (const languageKey of Object.keys(translationData)) {
      if (typeof translationData[languageKey] !== 'object') { continue; }
      this.ngxTranslateService.setTranslation(languageKey, translationData[languageKey], merge);
    }
  }

}
