import { createSelector } from '@ngrx/store';

import * as AuthVMSelectors from '@services/auth/+store/auth-vm.selectors';

import * as CalendarSelectors from './calendar.selectors';
import { ApiCalendarEvent, CalendarEvent } from './api-calendar-event.model';
import { isValidArray } from '@shared/helpers/general.helpers';
import { ApiProject } from '@models/api-project.model';

const prepareEvent = (event: ApiCalendarEvent, projects?: { [key: number]: ApiProject }): CalendarEvent => {
  if (!event?.project_id) { return event; }
  return {
    ...event,
    project: projects?.[event.project_id]
  };
}

export const selectEvent = (id: number) => createSelector(
  CalendarSelectors.selectEventEntities, AuthVMSelectors.selectProjects,
  (eventsMap, projects): CalendarEvent => {
    const event = eventsMap[id];
    return prepareEvent(event, projects);
  }
);

export const selectEvents = createSelector(
  CalendarSelectors.selectAllEvents, AuthVMSelectors.selectProjects,
  (events, projects): CalendarEvent[] => {
    if (!isValidArray(events)) { return []; }
    return events.map(e => prepareEvent(e, projects));
  }
);