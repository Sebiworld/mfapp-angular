import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthSelectors from './auth.selectors';
import { AuthActions } from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthStoreFacade {

  public readonly loading$ = this.store.select(AuthSelectors.selectLoading);
  public readonly loginResponse$ = this.store.select(AuthSelectors.selectLoginResponse);
  public readonly registrationResponse$ = this.store.select(AuthSelectors.selectRegistrationResponse);
  public readonly loadingRegistrationConfirm$ = this.store.select(AuthSelectors.selectLoadingRegistrationConfirm);
  public readonly nickname$ = this.store.select(AuthSelectors.selectNickname);
  public readonly userid$ = this.store.select(AuthSelectors.selectUserid);
  public readonly username$ = this.store.select(AuthSelectors.selectUsername);
  public readonly userRoles$ = this.store.select(AuthSelectors.selectUserRoles);
  public readonly userRolesCount$ = this.store.select(AuthSelectors.selectUserRolesCount);
  public readonly userPermissions$ = this.store.select(AuthSelectors.selectUserPermissions);
  public readonly userPermissionsCount$ = this.store.select(AuthSelectors.selectUserPermissionsCount);
  public readonly projects$ = this.store.select(AuthSelectors.selectProjects);
  public readonly projectsCount$ = this.store.select(AuthSelectors.selectProjectsCount);
  public readonly isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
  public readonly isNotAuthenticated$ = this.store.select(AuthSelectors.selectIsNotAuthenticated);
  public readonly refreshToken$ = this.store.select(AuthSelectors.selectRefreshToken);
  public readonly accessToken$ = this.store.select(AuthSelectors.selectAccessToken);

  constructor(
    private store: Store
  ) { }

  setNickname(nickname: string) {
    this.store.dispatch(AuthActions.setNickname({ nickname }));
  }

  login(email: string, password: string, timestamp: number): void {
    this.store.dispatch(AuthActions.loginSession({ email, password, timestamp }));
  }

  logout(alert?: string, preventServerLogout?: boolean): void {
    this.store.dispatch(AuthActions.logoutSession({ alert, preventServerLogout }));
  }

  registration(
    email: string, password: string, firstname: string, lastname: string, birthdate: number, timestamp: number,
    nickname?: string, rolestext?: string) {
    this.store.dispatch(AuthActions.registration({ email, password, firstname, lastname, nickname, birthdate, rolestext, timestamp }));
  }

  confirmRegistration(token: string) {
    this.store.dispatch(AuthActions.registrationConfirm({ token }));
  }

  setInterruptedUrl(url: string): void {
    this.store.dispatch(AuthActions.saveTargetUrl({
      url
    }));
  }
}
