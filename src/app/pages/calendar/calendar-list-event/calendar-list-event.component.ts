import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ApiCalendarEvent, ApiCalendarTimespan } from '@services/calendar/+store/api-calendar-event.model';
import { TranslationService } from '@services/translation.service';
import { CalendarTimespanGroup } from '@shared/pipes/group-timespans.pipe';

@Component({
  selector: 'app-calendar-list-event',
  templateUrl: './calendar-list-event.component.html',
  styleUrls: ['./calendar-list-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarListEventComponent {

  @Input() event: ApiCalendarEvent;

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
