import { ApiPermission, ApiRole } from '@models/api-user.model';
import { createReducer, on } from '@ngrx/store';
import { cloneDeep as _cloneDeep } from 'lodash';

import { AuthActions } from './auth.actions';

const featureKey = 'auth';

export interface AuthState {
  nickname: string | null;
  refreshToken: string | null;
  accessToken: string | null;
  username: string | null;
  userid: string | null;
  roles: ApiRole[];
  permissions: ApiPermission[];
  loggedIn: boolean;

  loginResponse: { response?: any; type: 'success' | 'error'; timestamp: number } | null;
  loading: boolean;
  registrationResponse: { response?: any; type: 'success' | 'error'; timestamp: number } | null;
  loadingRegistrationConfirm: boolean;
}

const initialState: AuthState = {
  nickname: null,
  refreshToken: null,
  accessToken: null,
  username: null,
  userid: null,
  roles: [],
  permissions: [],
  loggedIn: false,

  loginResponse: null,
  loading: false,
  registrationResponse: null,
  loadingRegistrationConfirm: false,
};

const reducer = createReducer(
  initialState,

  on(AuthActions.usersettingsLoaded, (state, action) => ({
    ...state,
    ...action,
    type: undefined
  })),

  on(AuthActions.initSessionFinish, (state, action) => ({
    ...state,
    refreshToken: action.refresh_token,
    accessToken: action.access_token,
    userid: action.id,
    username: action.name,
    roles: action.roles || [],
    permissions: action.permissions || [],
    loggedIn: !!action.loggedIn
  })),

  on(AuthActions.loginSession, (state) => ({
    ...state,
    loading: true,
    loginResponse: null
  })),
  on(AuthActions.loginSessionSuccess, (state, action) => ({
    ...state,
    refreshToken: action.refresh_token,
    accessToken: action.access_token,
    username: action.username,
    loading: false,
    loginResponse: { type: 'success', timestamp: action.timestamp }
  })),
  on(AuthActions.loginSessionFailure, (state, action) => ({
    ...state,
    loading: false,
    loginResponse: { response: action.error, type: 'error', timestamp: action.timestamp }
  })),

  on(AuthActions.registration, (state) => ({
    ...state,
    loading: true,
    registrationResponse: null
  })),
  on(AuthActions.registrationSuccess, (state, action) => ({
    ...state,
    loading: false,
    registrationResponse: { type: 'success', timestamp: action.timestamp }
  })),
  on(AuthActions.registrationFailure, (state, action) => ({
    ...state,
    loading: false,
    registrationResponse: { response: action.error, type: 'error', timestamp: action.timestamp }
  })),

  on(AuthActions.loadUser, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.loadUserSuccess, (state, action) => ({
    ...state,
    userid: action.id,
    username: action.name,
    roles: action.roles || [],
    permissions: action.permissions || [],
    loggedIn: !!action.loggedIn
  })),
  on(AuthActions.loadUserSuccess, AuthActions.loadUserFailure, (state) => ({
    ...state,
    loading: false
  })),

  on(AuthActions.logoutSession, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.logoutSessionSuccess, (state) => ({
    ...state,
    refreshToken: null,
    accessToken: null,
    username: null,
    userid: null,
    roles: [],
    permissions: [],
    loggedIn: false
  })),
  on(AuthActions.logoutSessionFailure, (state) => ({
    ...state,
    loading: false
  })),

  on(AuthActions.registrationConfirm, (state) => ({
    ...state,
    loadingRegistrationConfirm: true
  })),
  on(AuthActions.registrationConfirmSuccess, AuthActions.registrationConfirmFailure, (state) => ({
    ...state,
    loadingRegistrationConfirm: false
  })),

  on(AuthActions.setNickname, (state, action) => ({ ...state, nickname: action.nickname })),
);

export const AuthReducer = {
  featureKey, initialState, reducer
};
