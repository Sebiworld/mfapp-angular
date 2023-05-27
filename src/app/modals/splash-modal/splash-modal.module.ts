import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { SplashModalComponent } from './splash-modal.component';

@NgModule({
  declarations: [
    SplashModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SplashModalModule { }
