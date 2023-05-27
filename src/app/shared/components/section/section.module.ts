import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '@shared/shared.module';
import { ContentBlocksModule } from '@shared/components/content-blocks/content-blocks.module';

import { SectionComponent } from './section.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    ContentBlocksModule
  ],
  declarations: [
    SectionComponent
  ],
  exports: [
    SectionComponent
  ]
})
export class SectionModule { }
