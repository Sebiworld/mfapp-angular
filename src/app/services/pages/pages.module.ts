import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PageEffects } from './+store/page.effects';
import { PageReducer } from './+store/page.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(PageReducer.featureKey, PageReducer.reducer),
    EffectsModule.forFeature([PageEffects])
  ]
})
export class PagesModule { }
