import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { StorageService } from '@services/storage.service';
import { AuthActions } from '@services/auth/+store/auth.actions';

import { AppStateActions } from './app-state.actions';
import { AppState } from './app-state.reducer';

@Injectable()
export class AppStateEffects {

  constructor(
    private actions$: Actions,
    private storageService: StorageService
  ) { }

  initAppState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppStateActions.initAppState),
      map(() => AppStateActions.initAppStateSuccess({ data: {} }))
    )
  );

  triggerLoadUsersettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppStateActions.initAppStateSuccess),
      map(() => AppStateActions.loadUsersettings())
    )
  );

  loadUsersettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppStateActions.loadUsersettings),
      switchMap(async () => {
        const statedata: Partial<AppState> = {};

        const darkModeFromStore = await this.storageService.get('darkMode');
        if (darkModeFromStore && ['on', 'off', 'auto'].includes(darkModeFromStore)) {
          statedata.darkMode = darkModeFromStore;
        }

        const startupFinishedFromStore = await this.storageService.get('startupFinished');
        if (startupFinishedFromStore) {
          statedata.startupFinished = true;
        }

        const startupLoginFinishedFromStore = await this.storageService.get('startupLoginFinished');
        if (startupLoginFinishedFromStore) {
          statedata.startupLoginFinished = true;
        }

        return statedata;
      }),
      map((statedata) => AppStateActions.loadedUsersettings(statedata))
    )
  );

  loadedUsersettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppStateActions.loadedUsersettings),
      map(() => AuthActions.initSession())
    )
  );

  initSessionFinish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initSessionFinish),
      map(() => AppStateActions.initAppStateFinish())
    )
  );
}
