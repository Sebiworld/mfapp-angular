import { Pipe, PipeTransform } from '@angular/core';
import { trim as _trim, escapeRegExp as _escapeRegExp } from 'lodash-es';

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe implements PipeTransform {

  transform(value: any, searchTerm: string, ...args: any[]): any {
    if (typeof value !== 'string' || !value) { return value; }
    if (typeof searchTerm !== 'string' || !searchTerm) { return value; }
    try {
      return value.replace(new RegExp('(' + _escapeRegExp(searchTerm) + ')', 'gi'), `<mark>$1</mark>`);
    } catch (err) { }
    return '';
  }

}
