import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

import { ApiService } from "@services/api/api.service";
import { ApiCalendarEvent } from "./+store/api-calendar-event.model";
import { isValidArray } from "@shared/helpers/general.helpers";
import { CalendarConverters } from "./+store/calendar.converters";

@Injectable({
  providedIn: 'root',
})
export class CalendarApiService extends ApiService {

  loadCalendar(params: { offset?: number, limit?: number } = {}): Observable<{ events: ApiCalendarEvent[] }> {
    return this.get(this.baseUrl + 'calendar', typeof params === 'object' ? params : {}).pipe(
      map(response => ({
        ...response,
        events: CalendarConverters.convertEvents(response.events)
      }))
    );
  }

  loadEvents(): Observable<{ events: ApiCalendarEvent[] }> {
    return this.get(this.baseUrl + 'calendar/events').pipe(
      map(response => ({
        ...response,
        events: CalendarConverters.convertEvents(response.events)
      }))
    );
  }

  loadEvent(id: number | string): Observable<{ event: ApiCalendarEvent }> {
    return this.get(this.baseUrl + 'calendar/events/' + id).pipe(
      map(response => ({
        ...response,
        event: CalendarConverters.convertEvent(response.event)
      }))
    );
  }

  saveEvent(event: ApiCalendarEvent): Observable<{ event: ApiCalendarEvent, success: boolean }> {
    const apiEvent = {
      ...event
    };
    if (apiEvent.created) {
      apiEvent.created = Math.floor(apiEvent.created / 1000);
    }
    if (apiEvent.modified) {
      apiEvent.modified = Math.floor(apiEvent.modified / 1000);
    }

    if (isValidArray(apiEvent.timespans)) {
      apiEvent.timespans = apiEvent.timespans.map(
        ts => {
          const apiTimestamp = { ...ts };
          if (apiTimestamp.created) {
            apiTimestamp.created = Math.floor(apiTimestamp.created / 1000);
          }
          if (apiTimestamp.modified) {
            apiTimestamp.modified = Math.floor(apiTimestamp.modified / 1000);
          }
          if (apiTimestamp.timeFrom) {
            apiTimestamp.timeFrom = Math.floor(apiTimestamp.timeFrom / 1000);
          }
          if (apiTimestamp.timeUntil) {
            apiTimestamp.timeUntil = Math.floor(apiTimestamp.timeUntil / 1000);
          }
          return apiTimestamp;
        }
      );
    }

    if (apiEvent?.id) {
      return this.post(this.baseUrl + 'calendar/events/' + apiEvent.id, {
        event: apiEvent
      }).pipe(
        map(response => ({
          ...response,
          event: CalendarConverters.convertEvent(response.event)
        }))
      );
    }
    return this.post(this.baseUrl + 'calendar/events', {
      event: apiEvent
    }).pipe(
      map(response => ({
        ...response,
        event: CalendarConverters.convertEvent(response.event)
      }))
    );
  }
}
