import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { ApiCalendarEvent } from './api-calendar-event.model';

const adapter: EntityAdapter<ApiCalendarEvent> = createEntityAdapter<ApiCalendarEvent>({
  selectId: (event: ApiCalendarEvent) => event.id,
  sortComparer: (a: ApiCalendarEvent, b: ApiCalendarEvent) => a.created - b.created
});
export interface CalendarEventState extends EntityState<ApiCalendarEvent> { }

const initialState: CalendarEventState = adapter.getInitialState({});

export const CalendarEventEntity = {
  ...adapter.getSelectors(),
  adapter, initialState
};
