import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { addSeconds, Duration, intervalToDuration } from 'date-fns';
import { interval, map, pairwise, shareReplay } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('numberEnter', [
      transition(':enter', [
        animate('600ms ease', keyframes([
          style({
            // opacity: 0,
            transform: 'translateY(0px)',
            offset: 0
          }),
          style({
            // opacity: 1,
            transform: 'translateY(0px)',
            offset: 0.01
          }),
          style({
            // opacity: 1,
            transform: 'translateY(80px)',
            offset: 0.99
          }),
          style({
            // opacity: 0,
            transform: 'translateY(80px)',
            offset: 1
          }),
        ]))
      ])
    ])
  ]
})
export class CountdownComponent {

  @Input() date: number;

  @ViewChild('countdownElement', { static: true }) countdownElement: ElementRef;

  public readonly timeLeft$ = interval(1000).pipe(
    map((i) => this.calculateDatetimeParts()),
    shareReplay(1)
  );
  public readonly timeLeftChars$ = this.timeLeft$.pipe(
    map(timeLeft => this.calculateChars(timeLeft))
  );

  public readonly timeLeftWithPhase$ = interval(250).pipe(
    map((i) => ({
      current: this.calculateDatetimeParts(),
      next: this.calculateDatetimeParts(1),
      phase: i % 4
    })),
    pairwise(),
    map(([previous, current]) => {
      if (current.phase === 1) {
        return { ...current, animated: true };
      } else if (current.phase === 0) {
        return { ...previous, phase: current.phase, animated: true };
      } else if (current.phase === 2) {
        return { ...previous, phase: current.phase, animated: true };
      }
      return { ...previous, phase: current.phase, animated: false };
    }),
    shareReplay(1)
  );
  public readonly timeLeftCharsWithPhase$ = this.timeLeftWithPhase$.pipe(
    map(timeLeft => ({
      ...timeLeft,
      current: this.calculateChars(timeLeft.current),
      next: this.calculateChars(timeLeft.next),
    }))
  );

  constructor() { }

  calculateDatetimeParts(add: number = 0) {
    if (!this.date) { return {}; }
    if (this.date <= (new Date()).getTime()) { return {}; }
    const duration = intervalToDuration({
      start: addSeconds(new Date(), add),
      end: this.date
    });
    return duration;
  }

  calculateChars(timeLeft: Duration) {
    const output: any = {
      years: ('' + (timeLeft.years || '')).split(''),
      months: ('' + (timeLeft.months || '')).split(''),
      days: ('' + (timeLeft.days || '')).split(''),
      hours: ('' + (timeLeft.hours || '')).split(''),
      minutes: ('' + (timeLeft.minutes || '')).split(''),
      seconds: ('' + (timeLeft.seconds || '')).split(''),
    };

    if (!output.years.length) {
      delete output.years;
    } else if (output.years.length === 1) {
      output.years = ['0', ...output.years];
    }

    if (!output.months.length && !output.years) {
      delete output.months;
    } else if (output.months.length === 0) {
      output.months = ['0', '0'];
    } else if (output.months.length === 1) {
      output.months = ['0', ...output.months];
    }

    if (!output.days.length && !output.years && !output.months) {
      delete output.days;
    } else if (output.days.length === 0) {
      output.days = ['0', '0'];
    } else if (output.days.length === 1) {
      output.days = ['0', ...output.days];
    }

    if (!output.hours.length && !output.years && !output.months && !output.days) {
      // delete output.hours;
      output.hours = ['0', '0'];
    } else if (output.hours.length === 0) {
      output.hours = ['0', '0'];
    } else if (output.hours.length === 1) {
      output.hours = ['0', ...output.hours];
    }

    if (!output.minutes.length && !output.years && !output.months && !output.days && !output.hours) {
      // delete output.minutes;
      output.minutes = ['0', '0'];
    } else if (output.minutes.length === 0) {
      output.minutes = ['0', '0'];
    } else if (output.minutes.length === 1) {
      output.minutes = ['0', ...output.minutes];
    }

    if (!output.seconds.length && !output.years && !output.months && !output.days && !output.hours && !output.minutes) {
      // delete output.seconds;
      output.seconds = ['0', '0'];
    } else if (output.seconds.length === 0) {
      output.seconds = ['0', '0'];
    } else if (output.seconds.length === 1) {
      output.seconds = ['0', ...output.seconds];
    }

    return output;
  }

  trackFigure(index: number, element) {
    return index;
  }
}
