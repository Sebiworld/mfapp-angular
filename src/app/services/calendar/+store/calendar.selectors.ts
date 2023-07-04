import { createFeatureSelector, createSelector } from '@ngrx/store';
import { trim as _trim } from 'lodash-es';

import { CalendarState, CalendarReducer } from './calendar.reducer';

export const selectCalendarState = createFeatureSelector<CalendarState>(
  CalendarReducer.featureKey
);

export const selectLoading = createSelector(
  selectCalendarState,
  (state: CalendarState) => state.loading
);