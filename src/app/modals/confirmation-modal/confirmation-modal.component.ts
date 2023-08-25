import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Colorvariant } from '@models/colorvariant.model';
import { TranslatableText } from '@models/translatableText.model';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationModalComponent {

  @Input() id?: string;

  @Input() color: Colorvariant = 'medium';
  @Input() title: TranslatableText = '';
  @Input() text: TranslatableText = '';

  @Input() yesLabel: TranslatableText = { key: 'general.yes', params: { fallback: 'Ja' } };
  @Input() yesColor: Colorvariant = 'success';
  @Input() noLabel: TranslatableText = { key: 'general.no', params: { fallback: 'Nein' } };
  @Input() noColor: Colorvariant = 'danger';
  @Input() cancelLabel: TranslatableText = { key: 'general.cancel', params: { fallback: 'Abbrechen' } };
  @Input() cancelColor: Colorvariant = 'medium';

  constructor(
    private readonly modalController: ModalController
  ) { }

  yes() {
    return this.dismiss({
      confirmed: true
    });
  }

  no() {
    return this.dismiss({
      confirmed: false
    });
  }

  dismiss(params?: any) {
    this.modalController.dismiss({
      dismissed: true,
      ...(typeof params === 'object' ? params : {})
    }, undefined, this.id);
  }
}
