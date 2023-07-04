import { createReducer, on } from '@ngrx/store';

import { CalendarActions } from './calendar.actions';

const featureKey = 'calendar';

export interface CalendarState {
  loading: boolean;
}

const initialState: CalendarState = {
  loading: false
};

const reducer = createReducer(
  initialState,

  on(CalendarActions.loadCalendar,
    state => ({ ...state, loading: true })
  ),
  on(CalendarActions.loadCalendarSuccess,
    state => ({ ...state, loading: true })
  ),
  on(CalendarActions.loadCalendarFailure, CalendarActions.loadCalendarNotModified,
    state => ({ ...state, loading: false })
  ),

);

export const CalendarReducer = {
  featureKey, initialState, reducer
};
