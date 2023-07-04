import { ChangeDetectionStrategy, Component, DestroyRef, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter, tap } from 'rxjs';
import { ModalController } from '@ionic/angular';

import { AuthStoreFacade } from '@services/auth/+store/auth-store.facade';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginModalComponent {

  private destroyRef = inject(DestroyRef);

  public static readonly MODAL_ID = 'login-modal';

  @Input() isStartup: boolean = false;

  public readonly isAuthenticated$ = this.authStoreFacade.isAuthenticated$;
  public readonly loading$ = this.authStoreFacade.loading$;

  public activeView: 'login' | 'register' = 'login';

  constructor(
    private modalController: ModalController,
    private authStoreFacade: AuthStoreFacade
  ) {
    this.isAuthenticated$.pipe(
      filter(val => !!val),
      debounceTime(100),
      tap(() => this.modalController.dismiss(undefined, undefined, LoginModalComponent.MODAL_ID)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  navigateToRegister() {
    this.activeView = 'register';
  }

  navigateToLogin() {
    this.activeView = 'login';
  }

  dismiss(): void {
    this.modalController.dismiss(undefined, undefined, LoginModalComponent.MODAL_ID);
  }
}
