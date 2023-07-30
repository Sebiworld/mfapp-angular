import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { TranslationService } from '@services/translation.service';

@Pipe({
  name: 'dateWithFallback'
})
export class DateWithFallbackPipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe,
    private translationService: TranslationService
  ) { }

  transform(value: Date | string | number | (Date | string | number)[], format?: string, locale?: string, timezone?: string): string {
    if (!locale) { locale = this.translationService.locale ?? 'de'; }
    if (!!value && typeof value === 'object' && Array.isArray(value)) {
      for (const val of value) {
        if (!val || !(['string', 'number'].includes(typeof val) || val instanceof Date)) { continue; }
        return this.datePipe.transform(val as Date | string | number, format, timezone, locale);
      }
    } else if (!!value && (['string', 'number'].includes(typeof value) || value instanceof Date)) {
      return this.datePipe.transform(value as Date | string | number, format, timezone, locale);
    }
    return '';
  }
}
