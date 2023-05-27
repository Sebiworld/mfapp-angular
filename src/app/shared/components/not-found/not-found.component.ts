import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppStateFacade } from '@store/app-state.facade';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {

  public readonly currentLanguage$ = this.appStateFacade.currentLanguage$;

  constructor(
    private appStateFacade: AppStateFacade
  ) { }

  ngOnInit(): void {
  }

}
