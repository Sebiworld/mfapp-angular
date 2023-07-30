import { createFeatureSelector, createSelector } from '@ngrx/store';
import { trim as _trim } from 'lodash-es';

import { CalendarState, CalendarReducer } from './calendar.reducer';
import { CalendarEventEntity, CalendarEventState } from './calendar-event.entity';

export const selectCalendarState = createFeatureSelector<CalendarState>(
  CalendarReducer.featureKey
);

export const selectLoading = createSelector(
  selectCalendarState,
  (state: CalendarState) => state.loading
);

export const selectEventsState = createSelector(selectCalendarState, (state: CalendarState) => state.events);
export const selectEventIds = createSelector(selectEventsState, CalendarEventEntity.selectIds);
export const selectEventEntities = createSelector(selectEventsState, CalendarEventEntity.selectEntities);
export const selectAllEvents = createSelector(selectEventsState, CalendarEventEntity.selectAll);
export const selectEventsTotal = createSelector(selectEventsState, CalendarEventEntity.selectTotal);