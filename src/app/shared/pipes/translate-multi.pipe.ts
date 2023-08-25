import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isEqual as _isEqual } from 'lodash-es';

import { TranslatableText } from '@models/translatableText.model';
import { firstValueFrom } from 'rxjs';

@Pipe({
  name: 'translateMulti'
})
export class TranslateMultiPipe implements PipeTransform {

  constructor(
    private readonly translateService: TranslateService
  ) { }

  transform(value: TranslatableText, options?: { spacer?: string }): any {
    return this.translateValue(value, options);
  }

  private async translateValue(value: TranslatableText, options?: { spacer?: string }) {
    if (typeof value === 'object' && Array.isArray(value)) {
      return value.map(async v => await this.translateSingleValue(v)).join(options?.spacer ?? ' ')
    }
    return this.translateSingleValue(value);
  }

  private async translateSingleValue(value: string | { key: string, params?: any }) {
    if (typeof value === 'string') {
      return firstValueFrom(this.translateService.get(value));
    }
    if (value?.key) {
      return firstValueFrom(this.translateService.get(value.key, value?.params));
    }
    return '';
  }
}
