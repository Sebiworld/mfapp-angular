import { Location } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private destroyRef = inject(DestroyRef);

  private history: string[] = [];

  constructor(
    private readonly router: Router,
    private readonly location: Location
  ) {
    this.router.events.pipe(
      tap((event) => {
        if (event instanceof NavigationEnd) {
          this.history.push(event.urlAfterRedirects);
        }
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  back(fallback?: string): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else if (fallback) {
      this.router.navigateByUrl(fallback, { replaceUrl: true });
    } else {
      this.router.navigateByUrl("/", { replaceUrl: true });
    }
  }

}
