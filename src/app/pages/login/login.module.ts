import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '@core/header/header.module';

import { SharedModule } from '@shared/shared.module';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    LoginPageRoutingModule,
    HeaderModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
