import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { startsWith as _startsWith } from 'lodash-es';

import { ApiService } from '@services/api/api.service';
import { NgrxHelpers } from '@shared/helpers/ngrx.helpers';

import { PageStoreFacade } from './page-store.facade';
import { ApiDefaultPage } from './api-default-page.model';
import { PageActions } from './page.actions';

@Injectable()
export class PageEffects {

  routerNavigated$ = createEffect(() => this.actions$.pipe(
    ofType(routerNavigationAction),
    map(action => NgrxHelpers.collectRouteData(action?.payload?.routerState)),
    filter(routeData => routeData?.data?.loadType === 'default' && !!routeData?.url),
    map((routeData) => {
      let path = routeData.url ?? '';
      if (path.startsWith('/tabs')) {
        path = path.substring(5);
      }
      if (!_startsWith(path, '/')) { path = '/' + path; }
      return PageActions.loadPageByPath({ path });
    })
  ));

  loadPageByPath$ = createEffect(() => this.actions$.pipe(
    ofType(PageActions.loadPageByPath),
    filter(action => !!action.path),
    concatLatestFrom((action) => [
      this.pageStoreFacade.pageByPath$(action.path)
    ]),
    switchMap(([action, existingPage]) => {
      const params: any = {};
      if (!action.forceReload && !!existingPage?.hash) {
        params.hash = existingPage.hash;
      }
      return this.apiService.getPage<ApiDefaultPage>(action.path, params).pipe(
        map(response => !!response?.id ? PageActions.loadPageSuccess({ page: response }) : PageActions.loadPageNotModified()),
        catchError(error => of(PageActions.loadPageFailure({ error })))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private pageStoreFacade: PageStoreFacade,
    private apiService: ApiService
  ) { }

}
