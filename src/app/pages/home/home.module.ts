import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { HeaderModule } from '@core/header/header.module';
import { FooterModule } from '@core/footer/footer.module';
import { LoaderModule } from '@core/loader/loader.module';
import { ContentBlocksModule } from '@shared/components/content-blocks/content-blocks.module';
import { SectionModule } from '@shared/components/section/section.module';
import { SectionArticlesModule } from '@shared/components/section-articles/section-articles.module';
import { CountdownModule } from '@shared/components/countdown/countdown.module';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    SharedModule,
    HeaderModule,
    FooterModule,
    LoaderModule,
    ContentBlocksModule,
    SectionModule,
    HomePageRoutingModule,
    SectionArticlesModule,
    CountdownModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
