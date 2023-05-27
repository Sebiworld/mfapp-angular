import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu.component';
import { SharedModule } from '@shared/shared.module';
import { LoginModalModule } from '@modals/login-modal/login-modal.module';

@NgModule({
  declarations: [
    SidemenuComponent
  ],
  imports: [
    SharedModule,
    LoginModalModule
  ],
  exports: [
    SidemenuComponent
  ]
})
export class SidemenuModule { }
