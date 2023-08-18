import { groupBy as _groupBy } from 'lodash-es';
import { setMilliseconds, setSeconds, setMinutes, setHours } from 'date-fns';

import { Converters } from '@shared/converters/converters';

import { ApiCalendarTimespan } from "./+store/api-calendar-event.model";
import { CalendarConverters } from './+store/calendar.converters';
import { compareNumberStrings } from '@shared/helpers/sort.helpers';

export interface CalendarTimespanGroup {
  date: number;
  timespans: ApiCalendarTimespan[];
}

export const groupTimespans = (timespans: ApiCalendarTimespan[]): CalendarTimespanGroup[] => {

  const groupsArray = _groupBy(timespans, timespan =>
    setHours(setMinutes(setSeconds(setMilliseconds(timespan.timeFrom, 0), 0), 0), 0).getTime()
  );

  const groups = Object.entries(groupsArray).map(([key, value]): CalendarTimespanGroup => {
    const date: number = Converters.parseIntOr(key, 0);
    const timespans: ApiCalendarTimespan[] = typeof value === 'object' && Array.isArray(value) ? value.map(timespan => timespan as ApiCalendarTimespan).filter(timespan => CalendarConverters.isTimespanValid(timespan)) : [];
    return {
      date,
      timespans
    };
  });

  return groups.sort((a, b) => compareNumberStrings(a?.date, b?.date));
}