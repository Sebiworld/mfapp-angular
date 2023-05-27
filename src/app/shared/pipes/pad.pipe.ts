import { Pipe, PipeTransform } from '@angular/core';
import { padStart as _padStart } from 'lodash-es';

@Pipe({
  name: 'pad'
})
export class PadPipe implements PipeTransform {

  transform(value: any, length: number = 2, chars: string = '0', ...args: any[]): any {
    value = '' + value;
    return _padStart(value, length, chars);
  }

}
