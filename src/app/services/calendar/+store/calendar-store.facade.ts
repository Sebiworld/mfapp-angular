import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { CalendarActions } from "./calendar.actions";
import * as CalendarSelectors from './calendar.selectors';

@Injectable({ providedIn: 'root' })
export class CalendarStoreFacade {

  public readonly loading$ = this.store.select(CalendarSelectors.selectLoading);
  public readonly events$ = this.store.select(CalendarSelectors.selectAllEvents);

  constructor(
    private store: Store
  ) { }

  loadCalendar(offset?: number, limit?: number) {
    this.store.dispatch(CalendarActions.loadCalendar({ offset, limit }));
  }
}
