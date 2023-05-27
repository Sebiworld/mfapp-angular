import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { RegisterConfirmModalComponent } from './register-confirm-modal.component';

@NgModule({
  declarations: [
    RegisterConfirmModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class RegisterConfirmModalModule { }
