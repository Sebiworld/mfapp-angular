import { NgModule } from '@angular/core';

import { FooterModule } from '@core/footer/footer.module';
import { HeaderModule } from '@core/header/header.module';
import { LoaderModule } from '@core/loader/loader.module';
import { ContentBlocksModule } from '@shared/components/content-blocks/content-blocks.module';
import { SectionModule } from '@shared/components/section/section.module';
import { SharedModule } from '@shared/shared.module';

import { DefaultPageRoutingModule } from './default-routing.module';
import { DefaultPage } from './default.page';

@NgModule({
  imports: [
    SharedModule,
    HeaderModule,
    FooterModule,
    LoaderModule,
    ContentBlocksModule,
    SectionModule,

    DefaultPageRoutingModule
  ],
  declarations: [DefaultPage]
})
export class DefaultPageModule { }
