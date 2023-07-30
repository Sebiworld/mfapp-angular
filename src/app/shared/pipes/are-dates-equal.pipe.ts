import { Pipe, PipeTransform } from '@angular/core';
import { isEqual, isSameMinute, isSameHour, isSameDay, isSameWeek, isSameMonth, isSameYear } from 'date-fns';

import { isValidArray } from '@shared/helpers/general.helpers';

@Pipe({
  name: 'areDatesEqual'
})
export class AreDatesEqualPipe implements PipeTransform {
  transform(values: (Date | number)[], format?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year', negate: boolean = false): boolean {
    if (negate) {
      return !this.areDatesEqual(values, format);
    }
    return this.areDatesEqual(values, format);
  }

  private areDatesEqual(values: (Date | number)[], format?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year') {
    if (!isValidArray(values)) { return false; }
    if (values.length <= 1) { return true; }
    const firstVal = values[0];
    return values.every(v => {
      if (format === 'minute') {
        return isSameMinute(firstVal, v);
      } else if (format === 'hour') {
        return isSameHour(firstVal, v);
      } else if (format === 'day') {
        return isSameDay(firstVal, v);
      } else if (format === 'week') {
        return isSameWeek(firstVal, v);
      } else if (format === 'month') {
        return isSameMonth(firstVal, v);
      } else if (format === 'year') {
        return isSameYear(firstVal, v);
      }
      return isEqual(firstVal, v);
    });
  }
}
