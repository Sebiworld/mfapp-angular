import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { HeaderModule } from '@core/header/header.module';
import { LoaderModule } from '@core/loader/loader.module';
import { FooterModule } from '@core/footer/footer.module';
import { ContentBlocksModule } from '@shared/components/content-blocks/content-blocks.module';
import { SectionModule } from '@shared/components/section/section.module';

import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';
import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component';

@NgModule({
  imports: [
    SharedModule,
    HeaderModule,
    FooterModule,
    LoaderModule,
    ContentBlocksModule,
    SectionModule,
    CalendarPageRoutingModule
  ],
  declarations: [CalendarPage, CalendarDetailComponent]
})
export class CalendarPageModule { }
