import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newlineToBr'
})
export class NewlineToBrPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (typeof value !== 'string') { return; }
    return value.replace(new RegExp('\n', 'g'), '<br>'); // replace tags
  }

}
