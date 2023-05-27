import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripNewLine'
})
export class StripNewLinePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (typeof value !== 'string') { return; }
    return value.replace(new RegExp('<br>', 'gi'), ' ').replace(new RegExp('\n', 'g'), ' '); // replace tags
  }

}
