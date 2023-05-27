import { Pipe, PipeTransform } from '@angular/core';
import { uniq as _uniq, uniqWith as _uniqWith, isEqual as _isEqual } from 'lodash-es';

type stringifyFnType = (a: any, b: any) => boolean;

@Pipe({
  name: 'arrayUnique'
})
export class ArrayUniquePipe<T> implements PipeTransform {
  transform(values: T[], comparator?: stringifyFnType | string): T[] {
    if (comparator && typeof comparator === 'string') {
      return _uniqWith(values, ((a, b) => a?.[comparator] === b?.[comparator]));
    } else if (comparator && typeof comparator === 'function') {
      return _uniqWith(values, comparator);
    }
    return _uniqWith(values, _isEqual);
  }

}
