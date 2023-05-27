import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LoaderModule } from '@core/loader/loader.module';

import { SharedModule } from '@shared/shared.module';

import { SectionArticlesComponent } from './section-articles.component';

@NgModule({
  declarations: [
    SectionArticlesComponent
  ],
  imports: [
    SharedModule,
    LoaderModule
  ],
  exports: [
    SectionArticlesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SectionArticlesModule { }
