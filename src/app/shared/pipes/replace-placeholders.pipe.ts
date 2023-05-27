import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { differenceInYears } from 'date-fns';

import { TranslationService } from '@services/translation.service';

@Pipe({
  name: 'replacePlaceholders'
})
export class ReplacePlaceholdersPipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe,
    private translationService: TranslationService
  ) { }

  transform(value: any, ...args: any[]): any {
    if (typeof value !== 'string') { return; }

    return value.replace(/\[\[(.*)\]\]/g, (v, placeholder) => {
      if (!placeholder || typeof placeholder !== 'string') { return ''; }
      if (placeholder.startsWith('years-since')) {
        return this.replaceYearsSince(placeholder);
      }
      if (placeholder.startsWith('date')) {
        return this.replaceDate(placeholder);
      }
      return '';
    });
  }

  private replaceYearsSince(placeholder: string) {
    const ts = parseInt(placeholder.substring('years-since '.length), 10);
    if (!ts || typeof ts !== 'number' || isNaN(ts)) { return ''; }
    const date = new Date(ts);
    return '' + differenceInYears(new Date(), date);
  }

  private replaceDate(placeholder: string) {
    const command = placeholder.replace(/\d+$/, '');
    const format = command.slice(5).trim() || 'shortDate';
    const ts = parseInt(placeholder.slice(command.length), 10);
    if (!ts || typeof ts !== 'number' || isNaN(ts)) { return ''; }
    const date = new Date(ts);
    return '' + this.datePipe.transform(date, format, undefined, this.translationService.locale);
  }
}
