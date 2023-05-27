import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nickname-modal',
  templateUrl: './nickname-modal.component.html',
  styleUrls: ['./nickname-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NicknameModalComponent implements OnInit {

  public static readonly MODAL_ID = 'name-modal';

  public myForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      nickname: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(values: any): void {
    this.modalController.dismiss({
      nickname: values.nickname,
      id: NicknameModalComponent.MODAL_ID
    });
  }
}
