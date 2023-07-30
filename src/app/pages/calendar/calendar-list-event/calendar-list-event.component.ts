import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApiCalendarEvent } from '@services/calendar/+store/api-calendar-event.model';

@Component({
  selector: 'app-calendar-list-event',
  templateUrl: './calendar-list-event.component.html',
  styleUrls: ['./calendar-list-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarListEventComponent {
  @Input() event: ApiCalendarEvent;
}
