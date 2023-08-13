import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ApiCalendarEvent } from './api-calendar-event.model';

export const CalendarActions = createActionGroup({
  source: 'CALENDAR',
  events: {
    'Load Calendar': props<{ offset?: number; limit?: number }>(),
    'Load Calendar Success': props<{ response: any; events: ApiCalendarEvent[] }>(),
    'Load Calendar Not Modified': emptyProps(),
    'Load Calendar Failure': props<{ error: any }>(),

    'Load Event': props<{ id: number }>(),
    'Load Event Success': props<{ event: ApiCalendarEvent }>(),
    'Load Event Not Modified': emptyProps(),
    'Load Event Failure': props<{ error: any }>(),

    'Save Event': props<{ event: ApiCalendarEvent }>(),
    'Save Event Success': props<{ response: any; event: ApiCalendarEvent; shouldNavigate: boolean; }>(),
    'Save Event Failure': props<{ error: any }>(),
  }
});
