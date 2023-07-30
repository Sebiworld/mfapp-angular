import { createReducer, on } from '@ngrx/store';

import { CalendarActions } from './calendar.actions';
import { CalendarEventState, CalendarEventEntity } from './calendar-event.entity';

const featureKey = 'calendar';

export interface CalendarState {
  loading: boolean;
  events: CalendarEventState;
}

const initialState: CalendarState = {
  loading: false,
  events: CalendarEventEntity.initialState
};

const reducer = createReducer(
  initialState,

  on(CalendarActions.loadCalendar,
    state => ({ ...state, loading: true })
  ),
  on(CalendarActions.loadCalendarSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      events: CalendarEventEntity.adapter.upsertMany(action.events, state.events)
    })
  ),
  on(CalendarActions.loadCalendarFailure, CalendarActions.loadCalendarNotModified,
    state => ({ ...state, loading: false })
  ),

);

export const CalendarReducer = {
  featureKey, initialState, reducer
};
