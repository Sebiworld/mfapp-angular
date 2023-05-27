import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthStoreFacade } from '@services/auth/+store/auth-store.facade';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  public readonly userid$ = this.authStoreFacade.userid$;
  public readonly username$ = this.authStoreFacade.username$;
  public readonly nickname$ = this.authStoreFacade.nickname$;
  public readonly userRoles$ = this.authStoreFacade.userRoles$;
  public readonly userRolesCount$ = this.authStoreFacade.userRolesCount$;

  constructor(
    private authStoreFacade: AuthStoreFacade
  ) { }

  async ngOnInit() {

  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
