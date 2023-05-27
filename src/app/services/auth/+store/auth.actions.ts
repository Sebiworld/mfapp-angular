import { ApiPermission, ApiRole } from '@models/api-user.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const AuthActions = createActionGroup({
  source: 'AUTH',
  events: {
    'Save Target Url': props<{ url: string }>(),

    'Set Nickname': props<{ nickname: string }>(),

    'Load User': emptyProps(),
    'Load User Success': props<{
      id: string;
      name: string;
      roles?: ApiRole[];
      permissions?: ApiPermission[];
      loggedIn: boolean;
    }>(),
    'Load User Failure': props<{ error: any }>(),

    // INIT
    'Init Session': emptyProps(),
    'Init Session Finish': props<{
      refresh_token?: string;
      access_token?: string;
      id: string;
      name: string;
      roles?: ApiRole[];
      permissions?: ApiPermission[];
      loggedIn: boolean;
    }>(),

    // LOGIN: Get Refresh-Token
    'Login Session': props<{
      email: string;
      password: string;
      timestamp: number;
    }>(),
    'Login Session Success': props<{
      refresh_token: string;
      access_token: string;
      username: string;
      timestamp: number;
    }>(),
    'Login Session Failure': props<{
      error: any;
      timestamp: number;
    }>(),

    // Access: Get Access-Token & Renew Refresh-Token
    'Access Session': emptyProps(),
    'Access Session Success': props<{
      refresh_token: string;
      access_token: string;
    }>(),
    'Access Session Failure': props<{ error: any }>(),

    'Login Session Load Usersettings': props<{ sid: string }>(),
    'Login Session Load Usersettings Finish': props<{ data: any }>(),
    'Login Session Return To Target Url': emptyProps(),
    'Login Session Finish': emptyProps(),

    Registration: props<{
      email: string;
      password: string;
      firstname: string;
      lastname: string;
      nickname?: string;
      birthdate: number;
      rolestext?: string;
      timestamp: number;
    }>(),
    'Registration Success': props<{ timestamp: number }>(),
    'Registration Failure': props<{ error: any; timestamp: number }>(),

    'Registration Confirm': props<{
      token: string;
    }>(),
    'Registration Confirm Success': emptyProps(),
    'Registration Confirm Failure': props<{ error: any }>(),

    // LOGOUT
    'Logout Session': props<{ preventServerLogout?: boolean; alert?: string }>(),
    'Logout Session Success': emptyProps(),
    'Logout Session Failure': props<{ error: any }>(),

    'Usersettings Loaded': props<Partial<AuthState>>(),

    'Change Password Success': emptyProps()
  }
});
