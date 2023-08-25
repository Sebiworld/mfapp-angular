import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { CalendarActions } from "./calendar.actions";
import * as CalendarSelectors from './calendar.selectors';
import { ApiCalendarEvent } from "./api-calendar-event.model";

@Injectable({ providedIn: 'root' })
export class CalendarStoreFacade {

  public readonly loading$ = this.store.select(CalendarSelectors.selectLoading);
  public readonly loadEventLoading$ = this.store.select(CalendarSelectors.selectLoadEventLoading);
  public readonly saveEventLoading$ = this.store.select(CalendarSelectors.selectSaveEventLoading);
  public readonly events$ = this.store.select(CalendarSelectors.selectAllEvents);

  constructor(
    private store: Store
  ) { }

  loadCalendar(offset?: number, limit?: number) {
    this.store.dispatch(CalendarActions.loadCalendar({ offset, limit }));
  }
  loadCalendarSuccess(events: ApiCalendarEvent[]) {
    this.store.dispatch(CalendarActions.loadCalendarSuccess({ events }));
  }

  loadEvent(id: number) {
    this.store.dispatch(CalendarActions.loadEvent({ id }));
  }
  loadEventSuccess(event: ApiCalendarEvent) {
    this.store.dispatch(CalendarActions.loadEventSuccess({ event }));
  }

  saveEvent(event: ApiCalendarEvent) {
    this.store.dispatch(CalendarActions.saveEvent({ event }));
  }
  deleteEvent(event: ApiCalendarEvent) {
    this.store.dispatch(CalendarActions.deleteEvent({ event }));
  }

  event$(id: number) {
    return this.store.select(CalendarSelectors.selectEvent(id));
  }
}
