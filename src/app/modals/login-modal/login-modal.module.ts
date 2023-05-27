import { NgModule } from '@angular/core';
import { LoaderModule } from '@core/loader/loader.module';

import { SharedModule } from '@shared/shared.module';

import { LoginModalComponent } from './login-modal.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
  declarations: [
    LoginModalComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    SharedModule,
    LoaderModule
  ]
})
export class LoginModalModule { }
