import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, take, tap } from 'rxjs';

import { AuthStoreFacade } from '@services/auth/+store/auth-store.facade';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-register-confirm-modal',
  templateUrl: './register-confirm-modal.component.html',
  styleUrls: ['./register-confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterConfirmModalComponent implements OnInit {

  public static readonly MODAL_ID = 'register-confirm-modal';

  @Input() token: string;

  public readonly loadingRegistrationConfirm$ = this.authStoreFacade.loadingRegistrationConfirm$;

  constructor(
    private modalController: ModalController,
    private authStoreFacade: AuthStoreFacade,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.confirmRegistration(this.token);
    this.loadingRegistrationConfirm$.pipe(
      filter(loading => !loading),
      take(1),
      tap(() => this.dismiss()),
      takeUntilDestroyed()
    ).subscribe();
  }

  dismiss(): void {
    this.modalController.dismiss(undefined, undefined, RegisterConfirmModalComponent.MODAL_ID);
  }
}
