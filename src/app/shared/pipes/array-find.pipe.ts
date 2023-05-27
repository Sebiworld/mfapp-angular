import { Pipe, PipeTransform } from '@angular/core';

import { find as _find } from 'lodash-es';

@Pipe({
  name: 'arrayFind'
})
export class ArrayFindPipe<T> implements PipeTransform {
  transform(values: T[], matchArgs: any): T {
    return _find(values, matchArgs);
  }
}
