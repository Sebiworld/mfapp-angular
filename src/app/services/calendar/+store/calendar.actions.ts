import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiCalendarEvent } from './api-calendar-event.model';

export const CalendarActions = createActionGroup({
  source: 'CALENDAR',
  events: {
    'Load Calendar': props<{ offset?: number; limit?: number }>(),
    'Load Calendar Success': props<{ response: any; events: ApiCalendarEvent[] }>(),
    'Load Calendar Not Modified': emptyProps(),
    'Load Calendar Failure': props<{ error: any }>()
  }
});
