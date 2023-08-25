import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '@shared/shared.module';
import { HeaderModule } from '@core/header/header.module';
import { LoaderModule } from '@core/loader/loader.module';
import { FooterModule } from '@core/footer/footer.module';
import { ContentBlocksModule } from '@shared/components/content-blocks/content-blocks.module';
import { SectionModule } from '@shared/components/section/section.module';
import { ConfirmationModalModule } from '@modals/confirmation-modal/confirmation-modal.module';

import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';
import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component';
import { CalendarListEventComponent } from './calendar-list-event/calendar-list-event.component';
import { TimespanPickerComponent } from './calendar-detail/timespan-picker/timespan-picker.component';

@NgModule({
  imports: [
    SharedModule,
    HeaderModule,
    FooterModule,
    LoaderModule,
    ContentBlocksModule,
    SectionModule,
    CalendarPageRoutingModule,
    QuillModule.forRoot(),
    ConfirmationModalModule
  ],
  declarations: [CalendarPage, CalendarDetailComponent, CalendarListEventComponent, TimespanPickerComponent]
})
export class CalendarPageModule { }
