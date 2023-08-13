import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { startsWith as _startsWith } from 'lodash-es';

import { CalendarActions } from './calendar.actions';
import { CalendarApiService } from '../calendar-api.service';
import { Router } from '@angular/router';

@Injectable()
export class CalendarEffects {

  loadCalendar$ = createEffect(() => this.actions$.pipe(
    ofType(CalendarActions.loadCalendar),
    switchMap((action) =>
      this.calendarApiService.loadCalendar().pipe(
        map((response) => {
          return CalendarActions.loadCalendarSuccess({ response, events: response?.events || [] });
        }),
        catchError(error => of(CalendarActions.loadCalendarFailure({ error })))
      )
    )
  ));

  loadEvent$ = createEffect(() => this.actions$.pipe(
    ofType(CalendarActions.loadEvent),
    switchMap((action) => {
      if (!action?.id) {
        return of(CalendarActions.loadEventFailure({ error: 'No valid id provided' }));
      }
      return this.calendarApiService.loadEvent(action.id).pipe(
        map((response) => {
          return CalendarActions.loadEventSuccess({ event: response?.event });
        }),
        catchError(error => of(CalendarActions.loadEventFailure({ error })))
      )
    })
  ));

  saveEvent$ = createEffect(() => this.actions$.pipe(
    ofType(CalendarActions.saveEvent),
    switchMap((action) =>
      this.calendarApiService.saveEvent(action.event).pipe(
        map((response) => {
          if (!response?.success) {
            throw new Error('Event could not be saved');
          }
          return CalendarActions.saveEventSuccess({
            response,
            event: response?.event,
            shouldNavigate: response?.event?.id && action?.event?.id !== response.event.id
          });
        }),
        catchError(error => of(CalendarActions.saveEventFailure({ error })))
      )
    )
  ));

  saveEventSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CalendarActions.saveEventSuccess),
    filter(action => !!action.shouldNavigate && !!action.event?.id),
    switchMap(async (action) => {
      await this.router.navigate(['calendar', action.event.id], {
        replaceUrl: true
      });
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private calendarApiService: CalendarApiService,
    private router: Router
  ) { }

}
