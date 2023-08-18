import { ChangeDetectionStrategy, Component, Input, Signal, computed, signal } from '@angular/core';

import { TranslationService } from '@services/translation.service';

import { ApiCalendarEvent, ApiCalendarTimespan } from '@services/calendar/+store/api-calendar-event.model';
import { CalendarTimespanGroup, groupTimespans } from '@services/calendar/calendar.helpers';

@Component({
  selector: 'app-calendar-list-event',
  templateUrl: './calendar-list-event.component.html',
  styleUrls: ['./calendar-list-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarListEventComponent {

  public readonly _event = signal<ApiCalendarEvent | undefined>(undefined)
  @Input() set event(value: ApiCalendarEvent | undefined) {
    this._event.set(value);
  }

  public readonly timespans: Signal<ApiCalendarTimespan[]> = computed(() => this._event()?.timespans || []);
  public readonly timespanGroups: Signal<CalendarTimespanGroup[]> = computed(() => groupTimespans(this.timespans()) || []);
  public readonly eventDates: Signal<number[]> = computed(() => this.timespanGroups().map(group => group.date));

  public readonly currentDate = new Date();
  public readonly locale = this.translationService.locale;

  constructor(
    private readonly translationService: TranslationService
  ) { }

  trackTimespanGroup(index, item: CalendarTimespanGroup) {
    return item.date;
  }

  trackTimespan(index, item: ApiCalendarTimespan) {
    return item.id;
  }
}
