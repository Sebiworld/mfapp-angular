import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { HeaderModule } from '@core/header/header.module';
import { FooterModule } from '@core/footer/footer.module';
import { LoaderModule } from '@core/loader/loader.module';
import { ContentBlocksModule } from '@shared/components/content-blocks/content-blocks.module';
import { SectionModule } from '@shared/components/section/section.module';

import { NewsPageRoutingModule } from './news-routing.module';
import { NewsPage } from './news.page';

@NgModule({
  imports: [
    SharedModule,
    HeaderModule,
    FooterModule,
    LoaderModule,
    ContentBlocksModule,
    SectionModule,
    NewsPageRoutingModule
  ],
  declarations: [NewsPage]
})
export class NewsPageModule { }
