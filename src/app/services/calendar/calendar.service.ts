import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { CalendarStoreFacade } from './+store/calendar-store.facade';
import { ApiCalendarEvent } from './+store/api-calendar-event.model';
import { CalendarApiService } from './calendar-api.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private readonly calendarStoreFacade: CalendarStoreFacade,
    private readonly calendarApiService: CalendarApiService
  ) { }

  loadCalendar(offset?: number, limit?: number) {
    return this.calendarStoreFacade.loadCalendar(offset, limit);
  }

  loadCalendar$(params: { offset?: number, limit?: number } = {}): Observable<boolean> {
    return this.calendarApiService.loadCalendar(params).pipe(
      map(response => {
        const events = response?.events;
        if (!events) {
          throw {
            error: 'No valid events found.',
            errorcode: 'no-events'
          };
        }
        this.calendarStoreFacade.loadCalendarSuccess(events);
        return true;
      })
    );
  }

  loadEvent(id: number) {
    return this.calendarStoreFacade.loadEvent(id);
  }

  loadEvent$(id: number): Observable<ApiCalendarEvent> {
    return this.calendarApiService.loadEvent(id).pipe(
      map(response => {
        const event = response?.event;
        if (!event) {
          throw {
            error: 'No valid event found.',
            errorcode: 'no-event'
          };
        }
        this.calendarStoreFacade.loadEventSuccess(event);
        return event;
      })
    );
  }

  saveEvent(event: ApiCalendarEvent) {
    return this.calendarStoreFacade.saveEvent(event);
  }

  deleteEvent(event: ApiCalendarEvent) {
    return this.calendarStoreFacade.deleteEvent(event);
  }
}
