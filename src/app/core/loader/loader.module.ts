import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
