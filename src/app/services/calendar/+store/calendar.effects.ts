import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, filter, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { startsWith as _startsWith } from 'lodash-es';

import { ApiService } from '@services/api/api.service';

import { CalendarActions } from './calendar.actions';

@Injectable()
export class CalendarEffects {

  // loadCalendar$ = createEffect(() => this.actions$.pipe(
  //   ofType(CalendarActions.loadCalendar),
  //   switchMap((action) =>
  //     this.apiService.getPage<ApiArchivePage>(
  //       action.path
  //     ).pipe(
  //       map((response) => {
  //         const items = response?.items || [];
  //         const page = {
  //           ...response,
  //           items: undefined,
  //           itemIds: items?.map(i => i.id) || []
  //         };
  //         return ArchiveActions.loadArchiveSuccess({ page, items });
  //       }),
  //       catchError(error => of(ArchiveActions.loadArchiveFailure({ error })))
  //     )
  //   )
  // ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) { }

}
