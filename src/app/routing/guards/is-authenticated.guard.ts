import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';

import { AuthStoreFacade } from '@services/auth/+store/auth-store.facade';

import { LoginModalComponent } from '@modals/login-modal/login-modal.component';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard  {
  constructor(
    private authStoreFacade: AuthStoreFacade,
    private router: Router,
    private modalController: ModalController
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const isAuthenticated = await firstValueFrom(this.authStoreFacade.isAuthenticated$);
    if (isAuthenticated) { return true; }

    await this.showLoginModal();
    const isAuthenticated2 = await firstValueFrom(this.authStoreFacade.isAuthenticated$);
    if (isAuthenticated2) { return true; }

    if (this.router.routerState.snapshot.url === '') {
      this.router.navigate(['/']);
    }

    return false;
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authStoreFacade.isAuthenticated$;
  }

  private async showLoginModal() {
    const modal = await this.modalController.create({
      component: LoginModalComponent,
      backdropDismiss: false,
      keyboardClose: false,
      cssClass: 'full-size',
      id: LoginModalComponent.MODAL_ID
    });
    await modal.present();
    await modal.onDidDismiss();
  }
}
