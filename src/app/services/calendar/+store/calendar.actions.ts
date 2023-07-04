import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CalendarActions = createActionGroup({
  source: 'CALENDAR',
  events: {
    'Load Calendar': props<{ offset?: number; limit?: number }>(),
    'Load Calendar Success': props<{ response: any }>(),
    'Load Calendar Not Modified': emptyProps(),
    'Load Calendar Failure': props<{ error: any }>()
  }
});
