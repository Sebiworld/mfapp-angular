import { Pipe, PipeTransform } from '@angular/core';
import { unescape as _unescape} from 'lodash-es';

@Pipe({
  name: 'unescapeHtml'
})
export class UnescapeHtmlPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (typeof value !== 'string') { return; }
    return _unescape(value).replace(new RegExp('\\\\\\\"', 'gi'), '"');
  }

}
