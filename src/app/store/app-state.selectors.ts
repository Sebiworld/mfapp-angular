import { createFeatureSelector, createSelector } from '@ngrx/store';

import { supportedLanguages } from '@services/translation.service';
import { isValidArray } from '@shared/helpers/general.helpers';

import { AppState, AppStateReducer, DarkMode } from './app-state.reducer';

export const selectAppState = createFeatureSelector<AppState>(
  AppStateReducer.featureKey
);

export const selectInitialized = createSelector(
  selectAppState,
  (state: AppState) => state.initialized
);

export const selectCurrentRoute = createSelector(
  selectAppState,
  (state: AppState) => state.currentRoute
);

export const selectCurrentLanguage = createSelector(
  selectAppState,
  (state: AppState) => state.currentLanguage
);

export const selectLanguageLinks = createSelector(
  selectAppState,
  (state: AppState) => {
    const links = isValidArray(state.languageLinks) ? [...state.languageLinks] : [];

    for (const lang of supportedLanguages) {
      if (!lang) { continue; }
      if (!!links.some(val => !!val && val.language === lang && !!val.url)) { continue; }
      if (lang === 'default') {
        links.push({
          language: lang,
          url: '/'
        });
      } else if (lang === 'de') {
        links.push({
          language: lang,
          url: '/de/'
        });
      }
    }

    return links;
  }
);

export const selectDarkMode = createSelector(
  selectAppState,
  (state: AppState): DarkMode => state.darkMode || 'auto'
);

export const selectIsStartupFinished = createSelector(
  selectAppState,
  (state: AppState) => !!state.startupFinished
);

export const selectIsStartupLoginFinished = createSelector(
  selectAppState,
  (state: AppState) => !!state.startupLoginFinished
);
