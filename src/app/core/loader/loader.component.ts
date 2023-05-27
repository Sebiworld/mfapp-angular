import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { PageStoreFacade } from '@services/pages/+store/page-store.facade';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

  @Input() overlay: 'all' | 'parent' | 'no' = 'all';
  @Input() loading$: Observable<boolean>;
  @Input() loading: boolean;

  timerRunning = false;

  // public readonly loading$ = this.pageStateFacade.loading$.pipe(
  //   removeLoaderFlickering(400, 1000)
  // );

  constructor(
    private pageStoreFacade: PageStoreFacade
  ) { }
};
