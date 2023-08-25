import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { ConfirmationModalComponent } from './confirmation-modal.component';

@NgModule({
  declarations: [
    ConfirmationModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ConfirmationModalModule { }
