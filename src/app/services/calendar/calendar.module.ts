import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CalendarEffects } from './+store/calendar.effects';
import { CalendarReducer } from './+store/calendar.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(CalendarReducer.featureKey, CalendarReducer.reducer),
    EffectsModule.forFeature([CalendarEffects])
  ],
})
export class CalendarModule { }
