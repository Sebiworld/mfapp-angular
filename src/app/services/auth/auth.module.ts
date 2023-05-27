import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NicknameModalModule } from '@modals/nickname-modal/nickname-modal.module';
import { LoginModalModule } from '@modals/login-modal/login-modal.module';

import { AuthEffects } from './+store/auth.effects';
import { AuthReducer } from './+store/auth.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(AuthReducer.featureKey, AuthReducer.reducer),
    EffectsModule.forFeature([AuthEffects]),
    NicknameModalModule,
    LoginModalModule
  ],
})
export class AuthModule { }
