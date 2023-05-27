import { MetaReducer, createReducer, on } from '@ngrx/store';

import { environment } from '@env/environment';
import { SupportedLanguage } from '@services/translation.service';

import { AppStateActions } from './app-state.actions';

const featureKey = 'appState';

export type DarkMode = 'on' | 'off' | 'auto';

export interface AppState {
  initialized: boolean;
  currentRoute: string;
  darkMode: DarkMode;
  currentLanguage: SupportedLanguage;
  languageLinks: {
    language: SupportedLanguage;
    url: string;
  }[];

  startupFinished: boolean;
  startupLoginFinished: boolean;
}

const initialState: AppState = {
  initialized: false,
  currentRoute: '',
  darkMode: 'auto',
  currentLanguage: 'default',
  languageLinks: [],

  startupFinished: false,
  startupLoginFinished: false
};

const reducer = createReducer(
  initialState,

  on(AppStateActions.initAppStateSuccess, (state, action) => ({ ...state, ...action.data })),
  on(AppStateActions.initAppStateFinish, state => ({ ...state, initialized: true })),
  on(AppStateActions.routeChanged, (state, action) => ({ ...state, currentRoute: action.route })),
  on(AppStateActions.loadedUsersettings, (state, action) => ({
    ...state,
    ...action,
    type: undefined
  })),
  on(AppStateActions.logoutReset, state => ({ ...state, sid: null, cookiesConfirmed: null })),
  on(AppStateActions.setLanguage, (state, action) => ({ ...state, currentLanguage: action.language })),
  on(AppStateActions.setLanguageLinks, (state, action) => ({ ...state, languageLinks: action.languageLinks })),
  on(AppStateActions.switchDarkMode, (state, action) => ({ ...state, darkMode: action.darkMode })),
  on(AppStateActions.setStartupFinished, (state, action) => ({ ...state, startupFinished: action.finished })),
  on(AppStateActions.setStartupLoginFinished, (state, action) => ({ ...state, startupLoginFinished: action.finished })),
);

const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const AppStateReducer = {
  featureKey, initialState, reducer, metaReducers
};
