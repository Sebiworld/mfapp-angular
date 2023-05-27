import { ApiRole } from '@models/api-user.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { isValidArray } from '@shared/helpers/general.helpers';
import { SortHelpers } from '@shared/helpers/sort.helpers';
import { some as _some } from 'lodash';

import { AuthReducer, AuthState } from './auth.reducer';

export const selectCurrentSession = createFeatureSelector<AuthState>(AuthReducer.featureKey);

export const selectLoading = createSelector(
  selectCurrentSession, (state: AuthState) => state.loading
);

export const selectLoginResponse = createSelector(
  selectCurrentSession, (state: AuthState) => state.loginResponse
);

export const selectRegistrationResponse = createSelector(
  selectCurrentSession, (state: AuthState) => state.registrationResponse
);

export const selectLoadingRegistrationConfirm = createSelector(
  selectCurrentSession, (state: AuthState) => state.loadingRegistrationConfirm
);

export const selectRefreshToken = createSelector(
  selectCurrentSession, (session) => session?.refreshToken
);

export const selectAccessToken = createSelector(
  selectCurrentSession, (session) => session?.accessToken
);

export const selectNickname = createSelector(
  selectCurrentSession, (session) => session?.nickname
);

export const selectUsername = createSelector(
  selectCurrentSession, (session) => session?.username
);

export const selectUserid = createSelector(
  selectCurrentSession, (session) => session?.userid
);

const rolesOrder = [
  'app-user', 'vereinsmitglied',
  'project', 'project-9to5', 'project-wie-im-himmel',
  'project-claus', 'project-der-medicus', 'project-die-paepstin',
  'project-der-zauberer-von-oz', 'project-oliver', 'project-die-schoene-und-das-biest',
  'others',
  'admin', 'superuser'
];
const rolesOrderReverse = rolesOrder.reverse();
const getRolesOrderIndex = (role: ApiRole) => {
  const indexExact = rolesOrderReverse.findIndex(name => name === role.name);
  if (indexExact >= 0) { return indexExact; }

  const indexStartWith = rolesOrderReverse.findIndex(name => role.name.startsWith(name));
  if (indexStartWith >= 0) { return indexStartWith; }

  const indexOther = rolesOrderReverse.findIndex(name => name === 'others');
  if (indexOther >= 0) { return indexOther; }

  return rolesOrder.length;
};

export const selectUserRoles = createSelector(
  selectCurrentSession, (session) => {
    if (!session?.roles || !isValidArray(session.roles)) { return []; }
    return session.roles.filter(role => !['guest'].includes(role.name)).sort((a, b) => {
      const indexA = getRolesOrderIndex(a);
      const indexB = getRolesOrderIndex(b);
      const compareVal = SortHelpers.compareNumbers(indexA, indexB);
      if (compareVal !== 0) { return compareVal * -1; }
      return SortHelpers.compareStrings(a.name, b.name);
    });
  }
);

export const selectUserRolesCount = createSelector(
  selectUserRoles, roles => roles?.length || 0
);

export const selectIsAuthenticated = createSelector(
  selectCurrentSession, (state: AuthState) => state.loggedIn
);
export const selectIsNotAuthenticated = createSelector(
  selectIsAuthenticated, loggedIn => !loggedIn
);
