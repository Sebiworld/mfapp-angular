import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ArchiveEffects } from './+store/archive.effects';
import { ArchiveReducer } from './+store/archive.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(ArchiveReducer.featureKey, ArchiveReducer.reducer),
    EffectsModule.forFeature([ArchiveEffects])
  ],
})
export class ArchiveModule { }
