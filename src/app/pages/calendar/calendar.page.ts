import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, distinctUntilChanged, of, tap } from 'rxjs';

import { AlertService } from '@services/alert.service';
import { ApiCalendarEvent } from '@services/calendar/+store/api-calendar-event.model';
import { CalendarStoreFacade } from '@services/calendar/+store/calendar-store.facade';
import { CalendarService } from '@services/calendar/calendar.service';
import { TranslationService } from '@services/translation.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  private destroyRef = inject(DestroyRef);

  private readonly _loading$ = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading$.asObservable().pipe(distinctUntilChanged());

  public readonly events$ = this.calendarStoreFacade.events$;

  constructor(
    private readonly calendarService: CalendarService,
    private readonly calendarStoreFacade: CalendarStoreFacade,
    private readonly alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadCalendar();
  }

  loadCalendar() {
    this._loading$.next(true);
    this.calendarService.loadCalendar$().pipe(
      tap(() => this._loading$.next(false)),
      catchError(error => {
        this._loading$.next(false);
        this.alertService.error(
          ['errors.title', 'errors.' + error.errorcode],
          undefined,
          [{ fallback: 'Fehler:' }, { fallback: 'Der Kalender konnte nicht geladen werden.' }]
        );
        return of();
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  trackCalendarEvent(index, value: ApiCalendarEvent) {
    return value.id;
  }
}
