import { Pipe, PipeTransform } from '@angular/core';
import { isValidArray } from '@shared/helpers/general.helpers';
import { reverse as _reverse } from 'lodash-es';

@Pipe({
  name: 'arrayReverse'
})
export class ArrayReversePipe<T> implements PipeTransform {
  transform(values: T[]): T[] {
    if (!isValidArray(values)) { return []; }
    return _reverse([...values]);
  }
}
