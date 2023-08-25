import { ChangeDetectionStrategy, Component, Input, Signal, computed, signal } from '@angular/core';

import { TranslationService } from '@services/translation.service';

import { ApiCalendarEvent, ApiCalendarTimespan } from '@services/calendar/+store/api-calendar-event.model';
import { CalendarTimespanGroup, groupTimespans } from '@services/calendar/calendar.helpers';
import { CalendarService } from '@services/calendar/calendar.service';
import { ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from '@modals/confirmation-modal/confirmation-modal.component';

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
    private readonly translationService: TranslationService,
    private readonly calendarService: CalendarService,
    private readonly modalController: ModalController
  ) { }

  async delete() {
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      cssClass: ['auto-height', 'large-width'],
      backdropDismiss: false,
      componentProps: {
        title: { key: 'calendar.event.delete', params: { fallback: 'Termin löschen' } },
        text: { key: 'calendar.event.delete-confirmation', params: { fallback: 'Möchtest du diesen Termin wirklich löschen?' } },
        noLabel: undefined
      }
    });
    await modal.present()
    const modalResult = await modal.onDidDismiss();

    if (modalResult?.data?.confirmed) {
      this.calendarService.deleteEvent(this._event());
    }
  }

  trackTimespanGroup(index, item: CalendarTimespanGroup) {
    return item.date;
  }

  trackTimespan(index, item: ApiCalendarTimespan) {
    return item.id;
  }
}
