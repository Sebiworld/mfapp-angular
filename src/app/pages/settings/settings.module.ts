import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { HeaderModule } from '@core/header/header.module';
import { FooterModule } from '@core/footer/footer.module';
import { LoaderModule } from '@core/loader/loader.module';
import { ContentBlocksModule } from '@shared/components/content-blocks/content-blocks.module';
import { SectionModule } from '@shared/components/section/section.module';

import { SettingsPageRoutingModule } from './settings-routing.module';
import { SettingsPage } from './settings.page';

@NgModule({
  imports: [
    SharedModule,
    HeaderModule,
    FooterModule,
    LoaderModule,
    ContentBlocksModule,
    SectionModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule { }
