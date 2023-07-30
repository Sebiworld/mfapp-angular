import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonDatetime } from '@ionic/angular';
import { BehaviorSubject, distinctUntilChanged, tap } from 'rxjs';
import { formatISO, parseISO, isEqual } from 'date-fns';

@Component({
  selector: 'app-timespan-picker',
  templateUrl: './timespan-picker.component.html',
  styleUrls: ['./timespan-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimespanPickerComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  @ViewChild('timeFrom', { static: true }) timeFromElement!: IonDatetime;
  @ViewChild('timeUntil', { static: true }) timeUntilElement!: IonDatetime;

  @Input() timeFrom$: BehaviorSubject<Date>;
  @Input() timeUntil$: BehaviorSubject<Date>;

  ngOnInit(): void {
    this.timeFrom$.pipe(
      distinctUntilChanged(isEqual),
      tap(date => {
        if (!this.timeFromElement) { return; }
        if (!(date instanceof Date)) { return; }
        const isoVal = formatISO(date);
        this.timeFromElement.value = isoVal;
        if (!this.timeUntilElement) { return; }
        this.timeUntilElement.min = isoVal
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();

    this.timeUntil$.pipe(
      distinctUntilChanged(isEqual),
      tap(date => {
        if (!this.timeUntilElement) { return; }
        if (!(date instanceof Date)) { return; }
        const isoVal = formatISO(date);
        this.timeUntilElement.value = isoVal;
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  changeTimeFrom(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!event?.detail?.value) { return; }
    const date = parseISO(event.detail.value);
    if (!date || !(date instanceof Date)) { return; }
    if (isEqual(date, this.timeFrom$.value)) { return; }

    this.timeFrom$.next(date);
  }

  changeTimeUntil(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!event?.detail?.value) { return; }
    const date = parseISO(event.detail.value);
    if (!date || !(date instanceof Date)) { return; }
    if (isEqual(date, this.timeUntil$.value)) { return; }

    this.timeUntil$.next(date);
  }
}
