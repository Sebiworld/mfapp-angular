import { MissingTranslationHandler } from "@ngx-translate/core";

export class MissingTranslationFallbackHandler implements MissingTranslationHandler {
  handle(params: any) {
    if (params?.interpolateParams) {
      const fallbackValue = params?.interpolateParams?.['fallback'];
      if (fallbackValue && typeof fallbackValue === 'string') {
        return fallbackValue;
      }
      return params.key;
    }
    return params.key;
  }
}