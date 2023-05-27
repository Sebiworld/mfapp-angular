import { Pipe, PipeTransform } from '@angular/core';
import { reverse as _reverse } from 'lodash-es';

@Pipe({
  name: 'arrayReverse'
})
export class ArrayReversePipe<T> implements PipeTransform {
  transform(values: T[]): T[] {
    return _reverse(values);
  }
}
