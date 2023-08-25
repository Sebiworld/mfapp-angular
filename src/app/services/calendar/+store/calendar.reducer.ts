import { createReducer, on } from '@ngrx/store';

import { CalendarActions } from './calendar.actions';
import { CalendarEventState, CalendarEventEntity } from './calendar-event.entity';
import { AuthActions } from '@services/auth/+store/auth.actions';

const featureKey = 'calendar';

export interface CalendarState {
  loading: string[];
  events: CalendarEventState;
}

const initialState: CalendarState = {
  loading: [],
  events: CalendarEventEntity.initialState
};

const reducer = createReducer(
  initialState,

  on(CalendarActions.loadCalendar,
    state => ({
      ...state,
      loading: [...state.loading, 'load-calendar']
    })
  ),
  on(CalendarActions.loadCalendarSuccess,
    (state, action) => ({
      ...state,
      loading: state.loading.filter(v => v !== 'load-calendar'),
      events: CalendarEventEntity.adapter.upsertMany(action.events, state.events)
    })
  ),
  on(CalendarActions.loadCalendarFailure, CalendarActions.loadCalendarNotModified,
    state => ({
      ...state,
      loading: state.loading.filter(v => v !== 'load-calendar')
    })
  ),

  on(CalendarActions.loadEvent,
    state => ({
      ...state,
      loading: [...state.loading, 'load-event']
    })
  ),
  on(CalendarActions.loadEventSuccess,
    (state, action) => ({
      ...state,
      loading: state.loading.filter(v => v !== 'load-event'),
      events: CalendarEventEntity.adapter.upsertOne(action.event, state.events)
    })
  ),
  on(CalendarActions.loadEventFailure, CalendarActions.loadEventNotModified,
    state => ({
      ...state,
      loading: state.loading.filter(v => v !== 'load-event')
    })
  ),

  on(CalendarActions.saveEvent,
    state => ({
      ...state,
      loading: [...state.loading, 'save-event']
    })
  ),
  on(CalendarActions.saveEventSuccess,
    (state, action) => ({
      ...state,
      loading: state.loading.filter(v => v !== 'save-event'),
      events: CalendarEventEntity.adapter.upsertOne(action.event, state.events)
    })
  ),
  on(CalendarActions.saveEventFailure,
    state => ({
      ...state,
      loading: state.loading.filter(v => v !== 'save-event')
    })
  ),

  on(CalendarActions.deleteEvent,
    state => ({
      ...state,
      loading: [...state.loading, 'delete-event']
    })
  ),
  on(CalendarActions.deleteEventSuccess,
    (state, action) => ({
      ...state,
      loading: state.loading.filter(v => v !== 'delete-event'),
      events: CalendarEventEntity.adapter.removeOne(action.id, state.events)
    })
  ),
  on(CalendarActions.deleteEventFailure,
    state => ({
      ...state,
      loading: state.loading.filter(v => v !== 'delete-event')
    })
  ),

  on(AuthActions.loginSessionSuccess, AuthActions.logoutSessionSuccess, (state) => ({
    ...state,
    ...initialState
  }))
);

export const CalendarReducer = {
  featureKey, initialState, reducer
};
