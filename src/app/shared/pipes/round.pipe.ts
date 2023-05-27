import { Pipe, PipeTransform } from '@angular/core';
import { round as _round } from 'lodash-es';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {
  transform(value: string | number, precision?: number): number {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    if (typeof value !== 'number' || isNaN(value)) {
      return 0;
    }
    return _round(value, precision);
  }
}
