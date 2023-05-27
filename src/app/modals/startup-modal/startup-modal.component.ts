import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-startup-modal',
  templateUrl: './startup-modal.component.html',
  styleUrls: ['./startup-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartupModalComponent implements OnInit {

  public static readonly MODAL_ID = 'startup-modal';

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.modalController.dismiss(undefined, undefined, StartupModalComponent.MODAL_ID);
  }

}
