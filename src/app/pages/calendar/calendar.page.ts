import { Component, OnInit } from '@angular/core';
import { ApiCalendarEvent } from '@services/calendar/+store/api-calendar-event.model';
import { CalendarStoreFacade } from '@services/calendar/+store/calendar-store.facade';
import { CalendarService } from '@services/calendar/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  public readonly events$ = this.calendarStoreFacade.events$;

  constructor(
    private readonly calendarService: CalendarService,
    private readonly calendarStoreFacade: CalendarStoreFacade
  ) { }

  ngOnInit() {
    this.calendarService.loadCalendar();
  }

  trackCalendarEvent(index, value: ApiCalendarEvent) {
    return value.id;
  }
}
