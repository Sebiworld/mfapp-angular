import { Pipe, PipeTransform } from '@angular/core';
import { capitalize as _capitalize } from 'lodash-es';

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (typeof value !== 'string' || value.length <= 0) { return ''; }
    return _capitalize(value[0]) + value.substring(1);
  }
}
