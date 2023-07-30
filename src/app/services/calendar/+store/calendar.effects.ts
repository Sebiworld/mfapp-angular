import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { startsWith as _startsWith } from 'lodash-es';

import { CalendarActions } from './calendar.actions';
import { CalendarApiService } from '../calendar-api.service';

@Injectable()
export class CalendarEffects {

  loadCalendar$ = createEffect(() => this.actions$.pipe(
    ofType(CalendarActions.loadCalendar),
    switchMap((action) =>
      this.calendarApiService.loadEvents().pipe(
        map((response) => {
          return CalendarActions.loadCalendarSuccess({ response, events: response?.events || [] });
        }),
        catchError(error => of(CalendarActions.loadCalendarFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private calendarApiService: CalendarApiService
  ) { }

}
