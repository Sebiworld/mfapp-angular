import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { startsWith as _startsWith } from 'lodash-es';

import { CalendarActions } from './calendar.actions';
import { CalendarApiService } from '../calendar-api.service';
import { AlertService } from '@services/alert.service';

@Injectable()
export class CalendarEffects {

  loadCalendar$ = createEffect(() => this.actions$.pipe(
    ofType(CalendarActions.loadCalendar),
    switchMap((action) =>
      this.calendarApiService.loadCalendar().pipe(
        map((response) => {
          return CalendarActions.loadCalendarSuccess({ events: response?.events || [] });
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
    switchMap(async (action) => {
      this.alertService.success('calendar.event.save-success', undefined, {
        fallback: 'Der Termin wurde gespeichert.'
      });
      await this.router.navigate(['/calendar']);
    })
  ), { dispatch: false });

  deleteEvent$ = createEffect(() => this.actions$.pipe(
    ofType(CalendarActions.deleteEvent),
    switchMap((action) =>
      this.calendarApiService.deleteEvent(action.event).pipe(
        map((response) => {
          if (!response?.success) {
            throw new Error('Event could not be deleted');
          }
          // TODO Alerts
          return CalendarActions.deleteEventSuccess({ id: action.event?.id });
        }),
        catchError(error => of(CalendarActions.deleteEventFailure({ error })))
      )
    )
  ));

  deleteEventSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CalendarActions.deleteEventSuccess),
    switchMap(async (action) => {
      this.alertService.success('calendar.event.delete-success', undefined, {
        fallback: 'Der Termin wurde gelöscht.'
      });
    })
  ), { dispatch: false });

  // saveEventSuccess$ = createEffect(() => this.actions$.pipe(
  //   ofType(CalendarActions.saveEventSuccess),
  //   filter(action => !!action.shouldNavigate && !!action.event?.id),
  //   switchMap(async (action) => {
  //     await this.router.navigate(['calendar', action.event.id], {
  //       replaceUrl: true
  //     });
  //   })
  // ), { dispatch: false });

  constructor(
    private readonly actions$: Actions,
    private readonly calendarApiService: CalendarApiService,
    private readonly alertService: AlertService,
    private readonly router: Router
  ) { }

}
