import { Injectable } from '@angular/core';

import { CalendarStoreFacade } from './+store/calendar-store.facade';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private calendarStoreFacade: CalendarStoreFacade
  ) { }

  loadCalendar(offset?: number, limit?: number) {
    return this.calendarStoreFacade.loadCalendar(offset, limit);
  }
}
