import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, filter, firstValueFrom, fromEvent, map, Observable, of, startWith, switchMap } from "rxjs";
import { AppStateActions } from "./app-state.actions";

import { AppState, DarkMode } from "./app-state.reducer";
import * as AppStateSelectors from './app-state.selectors';
import * as RouterSelectors from './router.selectors';

@Injectable({ providedIn: 'root' })
export class AppStateFacade {

  public readonly initialized$ = this.store.select(AppStateSelectors.selectInitialized);
  public readonly currentPath$ = this.store.select(RouterSelectors.selectCurrentPath);
  public readonly currentLanguage$ = this.store.select(AppStateSelectors.selectCurrentLanguage);
  public readonly languageLinks$ = this.store.select(AppStateSelectors.selectLanguageLinks);
  public readonly darkMode$ = this.store.select(AppStateSelectors.selectDarkMode);
  public readonly darkModeActivated$ = this.darkMode$.pipe(
    switchMap((value): Observable<boolean> => {
      if (value !== 'auto') { return of(value === 'on'); }
      return this.getCSSMedia$('(prefers-color-scheme:dark)');
    }),
    distinctUntilChanged()
  );

  public readonly isStartupFinished$ = this.store.select(AppStateSelectors.selectIsStartupFinished);
  public readonly isStartupLoginFinished$ = this.store.select(AppStateSelectors.selectIsStartupLoginFinished);

  constructor(
    private store: Store<AppState>
  ) { }

  async waitUntilInitialized(): Promise<boolean> {
    return await firstValueFrom(this.initialized$.pipe(filter(val => !!val)));
  }

  initApp() {
    this.store.dispatch(AppStateActions.initAppState());
  }

  getCSSMedia$(query: string): Observable<boolean> {
    const mediaQuery = window.matchMedia(query);
    return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
      startWith(mediaQuery),
      map((list: MediaQueryList) => list.matches)
    );
  }

  switchDarkMode(darkMode: DarkMode) {
    this.store.dispatch(AppStateActions.switchDarkMode({ darkMode }));
  }

  setStartupFinished(finished: boolean) {
    this.store.dispatch(AppStateActions.setStartupFinished({ finished }));
  }

  setStartupLoginFinished(finished: boolean) {
    this.store.dispatch(AppStateActions.setStartupLoginFinished({ finished }));
  }

}
