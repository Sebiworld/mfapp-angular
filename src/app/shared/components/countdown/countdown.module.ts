import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { CountdownComponent } from './countdown.component';

@NgModule({
  declarations: [
    CountdownComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CountdownComponent
  ]
})
export class CountdownModule { }
