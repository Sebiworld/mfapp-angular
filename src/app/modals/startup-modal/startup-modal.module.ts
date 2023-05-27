import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { StartupModalComponent } from './startup-modal.component';

@NgModule({
  declarations: [
    StartupModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class StartupModalModule { }
