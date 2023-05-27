import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppStateFacade } from '@store/app-state.facade';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(
    private appStateFacade: AppStateFacade) {
    console.log('TEST');
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

}
