import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginModalComponent } from '@modals/login-modal/login-modal.component';
import { AuthStoreFacade } from '@services/auth/+store/auth-store.facade';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidemenuComponent implements OnInit {

  public readonly isAuthenticated$ = this.authStoreFacade.isAuthenticated$;
  public readonly isNotAuthenticated$ = this.authStoreFacade.isNotAuthenticated$;
  public readonly nickname$ = this.authStoreFacade.nickname$;

  constructor(
    private authStoreFacade: AuthStoreFacade,
    private authService: AuthService,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
  }

  async login() {
    await this.showLoginModal();
  }

  private async showLoginModal() {
    const modal = await this.modalController.create({
      component: LoginModalComponent,
      backdropDismiss: false,
      keyboardClose: false,
      cssClass: 'login-modal full-size',
      id: 'login-modal'
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  logout() {
    this.authService.logout();
  }

}
