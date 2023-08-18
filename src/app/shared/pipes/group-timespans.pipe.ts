import { Pipe, PipeTransform } from '@angular/core';

import { ApiCalendarTimespan } from '@services/calendar/+store/api-calendar-event.model';
import { CalendarTimespanGroup, groupTimespans } from '@services/calendar/calendar.helpers';

@Pipe({
  name: 'groupTimespans'
})
export class GroupTimespansPipe implements PipeTransform {
  transform(timespans: ApiCalendarTimespan[]): CalendarTimespanGroup[] {
    return groupTimespans(timespans);
  }
}
