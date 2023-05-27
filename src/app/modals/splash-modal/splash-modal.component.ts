import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-modal',
  templateUrl: './splash-modal.component.html',
  styleUrls: ['./splash-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashModalComponent implements OnInit {

  public static readonly MODAL_ID = 'splash-modal';

  constructor() { }

  ngOnInit(): void {
  }

}
