import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, debounceTime, distinctUntilChanged, filter, map, of, switchMap, tap } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { addHours, fromUnixTime, isEqual } from 'date-fns';

import { TranslationService } from '@services/translation.service';
import { isValidArray } from '@shared/helpers/general.helpers';
import { CalendarService } from '@services/calendar/calendar.service';
import { ApiCalendarTimespan } from '@services/calendar/+store/api-calendar-event.model';
import { CalendarStoreFacade } from '@services/calendar/+store/calendar-store.facade';
import { AlertService } from '@services/alert.service';
import { NavigationService } from '@services/navigation.service';
import { AuthStoreFacade } from '@services/auth/+store/auth-store.facade';

import { TimespanPickerComponent } from './timespan-picker/timespan-picker.component';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDetailComponent {
  private destroyRef = inject(DestroyRef);

  public eventForm: FormGroup;
  public readonly locale = this.translationService.locale;

  public readonly id$ = this.activatedRoute.params.pipe(
    map(data => data?.id)
  );
  public readonly currentEvent$ = this.id$.pipe(
    switchMap(id => this.calendarStoreFacade.event$(id)),
  );
  public readonly saveable$ = this.currentEvent$.pipe(
    map(event => !!event?.saveable || !event?.id)
  );
  public readonly notSaveable$ = this.saveable$.pipe(
    map(val => !val)
  );
  public readonly currentDate = new Date();

  private readonly _loading$ = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading$.asObservable().pipe(distinctUntilChanged());

  public readonly saveEventLoading$ = this.calendarStoreFacade.saveEventLoading$;

  public readonly projects$ = this.authStoreFacade.projects$;

  public readonly editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['link', 'blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }, { 'header': [1, 2, 3, 4, 5, 6, false] }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent

      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button
    ]
  };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly translationService: TranslationService,
    private readonly popoverController: PopoverController,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly calendarService: CalendarService,
    private readonly calendarStoreFacade: CalendarStoreFacade,
    private readonly alertService: AlertService,
    private readonly navigationService: NavigationService,
    private readonly authStoreFacade: AuthStoreFacade
  ) {
    this.eventForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      project: new FormControl(''),
      timespans: new FormArray([this.createTimespan()], Validators.required)
    });

    this.eventForm.valueChanges.pipe(
      debounceTime(200),
      tap(() => this.changeDetectorRef.detectChanges()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();

    // Load current event:
    combineLatest([
      this.id$.pipe(distinctUntilChanged()), this.authStoreFacade.userid$
    ]).pipe(
      filter(([id]) => !!id && id !== 'new'),
      tap(() => this._loading$.next(true)),
      debounceTime(100),
      switchMap(([id]) => this.calendarService.loadEvent$(id).pipe(
        catchError(error => {
          this.alertService.error(
            ['errors.title', 'errors.' + error.errorcode],
            undefined,
            [{ fallback: 'Fehler:' }, { fallback: 'Der Kalender-Termin konnte nicht geladen werden.' }]
          );

          this.navigationService.back('/calendar');
          return of();
        })
      )),
      tap(() => this._loading$.next(false)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();

    this.currentEvent$.pipe(
      filter(event => !!event?.id && !!this.eventForm?.controls),
      tap(event => {
        if (this.eventForm.controls.id && this.eventForm.value.id !== event.id) {
          this.eventForm.patchValue({
            id: event.id
          });
        }
        if (this.eventForm.controls.title && this.eventForm.value.title !== event.title) {
          this.eventForm.patchValue({
            title: event.title
          });
        }
        if (this.eventForm.controls.description && this.eventForm.value.description !== event.description) {
          this.eventForm.patchValue({
            description: event.description
          });
        }
        if (this.eventForm.controls.project && this.eventForm.value.project !== event.project?.id) {
          this.eventForm.patchValue({
            project: event.project?.id
          });
        }
        if (this.eventForm.controls.timespans && isValidArray(event.timespans)) {
          const newTimespans = new FormArray([], Validators.required);
          for (const timespan of event.timespans) {
            if (!timespan.timeFrom || !timespan.timeUntil) { continue; }
            newTimespans.push(this.createTimespan(timespan));
          }
          if (newTimespans.controls.length <= 0) {
            newTimespans.push(this.createTimespan());
          }

          this.eventForm.setControl('timespans', newTimespans);
        }

        if (!event.saveable) {
          this.eventForm.disable();
        } else {
          this.eventForm.enable();
        }
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  private createTimespan(timespan?: Partial<ApiCalendarTimespan>): FormGroup {
    const timeFrom = timespan?.timeFrom || new Date();
    return new FormGroup({
      id: new FormControl(timespan?.id || ''),
      title: new FormControl(timespan?.title || ''),
      description: new FormControl(timespan?.description || ''),
      timeFrom: new FormControl(timeFrom),
      timeUntil: new FormControl(timespan?.timeUntil || addHours(timeFrom, 1))
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

  deleteTimespan(index) {
    this.timespans.removeAt(index);
  }

  save() {
    console.log('SAVE', this.eventForm.value);
    if (!isValidArray(this.eventForm.value.timespans) || !this.eventForm.value.timespans.length) {
      return;
    }

    const timespans: ApiCalendarTimespan[] = [];
    for (const item of this.eventForm.value.timespans) {
      const timeFrom = this.getTimeFromInput(item?.timeFrom);
      const timeUntil = this.getTimeFromInput(item?.timeUntil);
      if (!timeFrom || !timeUntil) { continue; }
      timespans.push({
        id: item.id,
        title: item.title,
        description: item.description,
        timeFrom,
        timeUntil
      });
    }

    this.calendarService.saveEvent({
      id: this.eventForm.value.id,
      title: this.eventForm.value.title,
      description: this.eventForm.value.description,
      project: this.eventForm.value.project,
      timespans
    });
  }

  private getTimeFromInput(input) {
    if (!input) { return input; }
    if (typeof input === 'number') { return input; }
    if (typeof input?.getTime === 'function') {
      return input.getTime();
    }
    return input;
  }
}
