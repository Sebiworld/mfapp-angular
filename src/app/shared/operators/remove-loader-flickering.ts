import { Observable, timer, combineLatest, merge } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  repeatWhen,
  startWith,
  take,
  takeUntil,
} from 'rxjs/operators';

export const removeLoaderFlickering = (
  loaderDelay: number, // 400ms
  timeAfterLoaderDelay: number // 1000ms
) => (source: Observable<boolean>): Observable<boolean> => new Observable<boolean>(subscriber => {

  const startLoading$ = source.pipe(filter(val => !!val));
  const stopLoading$ = source.pipe(filter(val => !val));

  // If start loading: Wait for 400ms if a stopLoading comes in:
  const startedWithDelay$ = timer(loaderDelay).pipe(
    takeUntil(stopLoading$),
    repeatWhen(() => startLoading$),
    mapTo(true)
  );

  // Remain in loading state for 1000ms (min)
  const minLoaderDelay$ = timer(timeAfterLoaderDelay).pipe(
    startWith(false),
    map(val => val !== false),
    take(2),
    repeatWhen(() => startedWithDelay$)
  );

  const result$ = combineLatest([
    source,
    minLoaderDelay$,
  ]).pipe(
    filter(([val, minimumReached]) => !val && minimumReached),
    mapTo(false)
  );

  return merge(startedWithDelay$, result$)
    .pipe(
      startWith(false),
      distinctUntilChanged()
    ).subscribe({
      next: value => subscriber.next(value),
      error: err => subscriber.error(err),
      complete: () => subscriber.complete(),
    });
});
