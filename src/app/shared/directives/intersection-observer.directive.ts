import { DestroyRef, Directive, ElementRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Directive({
  selector: '[appIntersectionObserver]'
})
export class IntersectionObserverDirective implements OnInit {

  private destroyRef = inject(DestroyRef);

  @Input() intersectionDebounce = 0;
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot: HTMLElement;
  @Input() intersectionThreshold: number | number[];

  @Output() visibilityChange = new EventEmitter<IntersectionStatus>();

  constructor(private element: ElementRef) { }
  ngOnInit() {
    const element = this.element.nativeElement;

    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold
    };
    fromIntersectionObserver(
      element,
      config,
      this.intersectionDebounce
    ).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((status) => {
      this.visibilityChange.emit(status);
    });
  }
}

export enum IntersectionStatus {
  Visible = 'Visible',
  Pending = 'Pending',
  NotVisible = 'NotVisible'
}

const fromIntersectionObserver = (
  element: HTMLElement,
  config: IntersectionObserverInit,
  debounce = 0
) =>
  new Observable<IntersectionStatus>(subscriber => {
    const subject$ = new Subject<{
      entry: IntersectionObserverEntry;
      observer: IntersectionObserver;
    }>();

    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (isIntersecting(entry)) {
            subject$.next({ entry, observer });
          }
        });
      },
      config
    );

    subject$.subscribe(() => {
      subscriber.next(IntersectionStatus.Pending);
    });

    subject$
      .pipe(
        debounceTime(debounce),
        filter(Boolean)
      )
      .subscribe(async ({ entry, observer }) => {
        const isEntryVisible = await isVisible(entry.target as HTMLElement);

        if (isEntryVisible) {
          subscriber.next(IntersectionStatus.Visible);
          observer.unobserve(entry.target);
        } else {
          subscriber.next(IntersectionStatus.NotVisible);
        }
      });

    intersectionObserver.observe(element);

    return {
      unsubscribe: () => {
        intersectionObserver.disconnect();
        subject$.unsubscribe();
      }
    };
  });

const isVisible = async (element: HTMLElement) => new Promise(resolve => {
  const observer = new IntersectionObserver(([entry]) => {
    resolve(entry.isIntersecting);
    observer.disconnect();
  });

  observer.observe(element);
});

const isIntersecting = (entry: IntersectionObserverEntry) => entry.isIntersecting || entry.intersectionRatio > 0;
