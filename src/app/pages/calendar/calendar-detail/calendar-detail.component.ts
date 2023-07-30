import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { addHours, fromUnixTime, isEqual } from 'date-fns';

import { TranslationService } from '@services/translation.service';
import { isValidArray } from '@shared/helpers/general.helpers';

import { TimespanPickerComponent } from './timespan-picker/timespan-picker.component';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDetailComponent {
  private destroyRef = inject(DestroyRef);

  eventForm: FormGroup;
  public readonly locale = this.translationService.locale;

  public readonly id$ = this.activatedRoute.params.pipe(
    map(data => data?.id)
  );
  public readonly currentDate = new Date();

  constructor(
    private activatedRoute: ActivatedRoute,
    private translationService: TranslationService,
    private popoverController: PopoverController,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.eventForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      timespans: new FormArray([this.createTimespan()], Validators.required)
    });

    this.eventForm.valueChanges.pipe(
      debounceTime(200),
      tap(() => this.changeDetectorRef.detectChanges()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  private createTimespan(): FormGroup {
    const timeFrom = new Date();
    return new FormGroup({
      title: new FormControl(''),
      timeFrom: new FormControl(timeFrom),
      timeUntil: new FormControl(addHours(timeFrom, 1))
    });
  }

  async openTimespanPicker(ev: Event, index, timeFrom, timeUntil) {
    let timeFromDate = timeFrom;
    if (typeof timeFrom === 'number') {
      timeFromDate = fromUnixTime(timeFrom);
    }
    if (!timeFromDate || !(timeFromDate instanceof Date)) {
      timeFromDate = new Date();
    }
    const timeFrom$ = new BehaviorSubject<Date>(timeFromDate);

    let timeUntilDate = timeUntil;
    if (typeof timeUntil === 'number') {
      timeUntilDate = fromUnixTime(timeUntil);
    }
    if (!timeUntilDate || !(timeUntilDate instanceof Date)) {
      timeUntilDate = new Date();
    }
    const timeUntil$ = new BehaviorSubject<Date>(timeUntilDate);

    const popover = await this.popoverController.create({
      component: TimespanPickerComponent,
      event: ev,
      translucent: true,
      id: 'calendar-detail-timespan-picker',
      componentProps: {
        isPopover: true,
        timeFrom$,
        timeUntil$
      },
      cssClass: ['larger']
    });

    await popover.present();

    timeFrom$.pipe(
      distinctUntilChanged(isEqual),
      tap(val => this.timespans?.controls?.[index].patchValue({
        timeFrom: val
      })),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();

    timeUntil$.pipe(
      distinctUntilChanged(isEqual),
      tap(val => this.timespans?.controls?.[index].patchValue({
        timeUntil: val
      })),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  get timespans(): FormArray {
    return <FormArray>this.eventForm.get('timespans');
  }

  addTimespan() {
    this.timespans.push(this.createTimespan());
  }
}
