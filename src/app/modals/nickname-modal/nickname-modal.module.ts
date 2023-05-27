import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { NicknameModalComponent } from './nickname-modal.component';

@NgModule({
  declarations: [
    NicknameModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class NicknameModalModule { }
