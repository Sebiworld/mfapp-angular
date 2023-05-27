import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, } from '@ngrx/effects';
import { AlertService } from '@services/alert.service';
import { StorageService } from '@services/storage.service';
import { AppStateActions } from '@store/app-state.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthApiService } from '../auth-api.service';
import { AuthStoreFacade } from './auth-store.facade';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.reducer';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authApiService: AuthApiService,
    private storageService: StorageService,
    private authStoreFacade: AuthStoreFacade,
    private alertService: AlertService
  ) { }

  saveRefreshToken$ = createEffect(() => this.authStoreFacade.refreshToken$.pipe(
    switchMap(async (token) => {
      const refreshTokenFromStore = await this.storageService.get('refreshToken');
      if (refreshTokenFromStore === token) { return; }
      if (!token) {
        await this.storageService.remove('refreshToken');
      } else {
        await this.storageService.set('refreshToken', token);
      }
    })
  ), { dispatch: false });

  loadUsersettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppStateActions.loadUsersettings),
      switchMap(async () => {
        const statedata: Partial<AuthState> = {};

        const refreshTokenFromStore = await this.storageService.get('refreshToken');
        if (refreshTokenFromStore) {
          statedata.refreshToken = refreshTokenFromStore;
        }

        const nicknameFromStore = await this.storageService.get('nickname');
        if (nicknameFromStore) {
          statedata.nickname = nicknameFromStore;
        }

        return statedata;
      }),
      map((statedata) => AuthActions.usersettingsLoaded(statedata))
    )
  );

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(
      AuthActions.loadUser,
      AuthActions.loginSessionSuccess,
      AuthActions.loginSessionFailure,
      AuthActions.logoutSessionSuccess,
      AuthActions.logoutSessionFailure
    ),
    switchMap((action) => this.authApiService.loadUser().pipe(
      map(response => {
        if (!response?.id) {
          throw new Error('Cannot load user');
        }
        return AuthActions.loadUserSuccess({ ...response });
      }),
      catchError(error => of(AuthActions.loadUserFailure({ error })))
    ))
  ));

  initSession$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.initSession),
    concatLatestFrom(() => [
      this.authStoreFacade.refreshToken$
    ]),
    switchMap(([, refreshToken]) => {
      if (!refreshToken) {
        return this.authApiService.loadUser().pipe(
          map(userResponse => AuthActions.initSessionFinish(userResponse)),
          catchError(() => of(AuthActions.initSessionFinish({
            name: null,
            id: null,
            roles: [],
            permissions: [],
            loggedIn: false
          })))
        );
      }

      return this.authApiService.access(refreshToken).pipe(
        switchMap((response) => this.authApiService.loadUser(response.access_token).pipe(
          map(userResponse => ({
            ...userResponse,
            refresh_token: response.refresh_token,
            access_token: response.access_token
          }))
        )),
        map(data => AuthActions.initSessionFinish(data)),
        catchError(() => this.authApiService.loadUser().pipe(
          map(userResponse => AuthActions.initSessionFinish(userResponse)),
          catchError(() => of(AuthActions.initSessionFinish({
            name: null,
            id: null,
            roles: [],
            permissions: [],
            loggedIn: false
          })))
        ))
      );
    })
  ));

  loginSession$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSession),
    switchMap((action) => this.authApiService.login(action.email, action.password).pipe(
      switchMap(response => {
        if (!response?.refresh_token) {
          throw new Error('Cannot start session');
        }

        return this.authApiService.access(response.refresh_token).pipe(
          map(response2 => ({
            ...response2,
            username: response.username
          }))
        );
      }),
      map(response => {
        if (!response?.refresh_token || !response?.access_token) {
          throw new Error('Cannot start session');
        }
        return AuthActions.loginSessionSuccess({
          refresh_token: response.refresh_token,
          access_token: response.access_token,
          username: response.username,
          timestamp: action.timestamp
        });
      }),
      catchError(error => of(AuthActions.loginSessionFailure({
        error, timestamp: action.timestamp
      })))
    ))
  ));

  loginSuccessMsg$ = createEffect(() => this.actions$.pipe(
    ofType(
      AuthActions.loginSessionSuccess
    ),
    switchMap(async () => {
      await this.alertService.success(
        'Tadaa! Du bist jetzt angemeldet!'
        , {
          id: 'login-success',
          className: 'toast-login-success',
          icon: '👏'
        }
      );
    })
  ), { dispatch: false });

  loginFailureMsg$ = createEffect(() => this.actions$.pipe(
    ofType(
      AuthActions.loginSessionFailure
    ),
    switchMap(async (action) => {
      let msg = 'Die Anmeldung ist fehlgeschlagen. Bitte überprüfe deine Eingaben.';
      if (action?.error) {
        msg += ' (' + (action.error?.message ?? action.error?.error ?? action.error?.msg ?? action.error) + ')';
      }
      await this.alertService.error(
        msg
        , {
          id: 'login-failed',
          autoClose: false,
          className: 'toast-login-failed'
        }
      );
    })
  ), { dispatch: false });

  registration$ = createEffect(() => this.actions$.pipe(
    ofType(
      AuthActions.registration
    ),
    switchMap((action) => this.authApiService.registration(
      action.email, action.password,
      action.firstname, action.lastname, action.birthdate,
      action.nickname, action.rolestext
    ).pipe(
      map(response => {
        if (!response?.success) { throw new Error('Registration not successful'); }
        this.alertService.success(
          `Deine Registrierung wurde abgeschickt. Bitte schau in dein Email-Postfach.
          Dort sollte gleich eine Email mit weiteren Anweisungen ankommen.`
          , {
            id: 'registration-success',
            className: 'toast-registration-success',
            dismissible: true,
            autoClose: false
          }
        );
        return AuthActions.registrationSuccess({ timestamp: action.timestamp });
      }),
      catchError(error => of(AuthActions.registrationFailure({ error, timestamp: action.timestamp })))
    ))
  ));


  registrationConfirm$ = createEffect(() => this.actions$.pipe(
    ofType(
      AuthActions.registrationConfirm
    ),
    switchMap((action) => this.authApiService.registrationConfirm(action.token).pipe(
      map(response => {
        if (!response?.success) { throw new Error('Registration Confirmation not successful'); }
        this.alertService.success(
          `Yey! Du bist jetzt registriert!
          Dein Konto wurde freigeschaltet und du kannst dich jetzt mit deiner Email-Adresse und deinem Passwort anmelden.`
          , {
            id: 'registration-confirm-success',
            className: 'toast-registration-confirm-success',
            icon: '👏',
            dismissible: true,
            autoClose: false
          }
        );
        return AuthActions.registrationConfirmSuccess();
      }),
      catchError(error => of(AuthActions.registrationConfirmFailure({ error })))
    ))
  ));

  logoutSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutSession),
      switchMap(() => this.authApiService.logout().pipe(
        map(() => AuthActions.logoutSessionSuccess()),
        catchError(error => of(AuthActions.logoutSessionFailure({ error })))
      ))
    )
  );

  logoutSuccessMsg$ = createEffect(() => this.actions$.pipe(
    ofType(
      AuthActions.logoutSessionSuccess
    ),
    switchMap(async () => {
      await this.alertService.success(
        'Du bist jetzt abgemeldet.'
        , {
          id: 'logout-success',
          className: 'toast-logout-success'
        }
      );
    })
  ), { dispatch: false });

  logoutFailureMsg$ = createEffect(() => this.actions$.pipe(
    ofType(
      AuthActions.logoutSessionFailure
    ),
    switchMap(async (action) => {
      let msg = 'Der Logout ist fehlgeschlagen. Bitte versuch es später noch einmal.';
      if (action?.error) {
        msg += ' (' + (action.error?.message ?? action.error?.msg ?? action.error) + ')';
      }
      await this.alertService.error(
        msg
        , {
          id: 'logout-failed',
          autoClose: false,
          className: 'toast-logout-failed'
        }
      );
    })
  ), { dispatch: false });
}
