import { Pipe, PipeTransform } from '@angular/core';
import { groupBy as _groupBy } from 'lodash-es';
import { setMilliseconds, setSeconds, setMinutes, setHours } from 'date-fns';

import { ApiCalendarTimespan } from '@services/calendar/+store/api-calendar-event.model';
import { Converters } from '@shared/converters/converters';
import { CalendarConverters } from '@services/calendar/+store/calendar.converters';

export interface CalendarTimespanGroup {
  date: number;
  timespans: ApiCalendarTimespan[];
}

@Pipe({
  name: 'groupTimespans'
})
export class GroupTimespansPipe implements PipeTransform {
  transform(timespans: ApiCalendarTimespan[]): CalendarTimespanGroup[] {

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

    return groups;
  }
}
