import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { ToastOptions } from '@ionic/core/dist/types/components/toast/toast-interface';

import { SupportedLanguage } from '@services/translation.service';

import { AppState, DarkMode } from './app-state.reducer';

export const AppStateActions = createActionGroup({
  source: 'APP',
  events: {
    'Init App State': emptyProps(),
    'Init App State Success': props<{ data: any }>(),
    'Init App State Finish': emptyProps(),

    'Load Usersettings': emptyProps(),
    'Loaded Usersettings': props<Partial<AppState>>(),

    'Show Notification': props<{ payload: ToastOptions }>(),
    'Route Changed': props<{ route: string }>(),

    'Set Language': props<{ language: SupportedLanguage }>(),
    'Set Language Links': props<{
      languageLinks: {
        language: SupportedLanguage;
        url: string;
      }[];
    }>(),
    'Switch Dark Mode': props<{ darkMode: DarkMode }>(),

    'Set Cookies Confirmed': props<{ confirmed: boolean | null }>(),
    'Logout Reset': emptyProps(),

    'Set Startup Finished': props<{ finished: boolean }>(),
    'Set Startup Login Finished': props<{ finished: boolean }>(),
  }
});
