import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { firstValueFrom, Observable, take } from 'rxjs';

import { AuthStoreFacade } from '@services/auth/+store/auth-store.facade';

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthenticatedGuard implements CanActivate, CanMatch {
  constructor(
    private authStoreFacade: AuthStoreFacade,
    private router: Router
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const isAuthenticated = await firstValueFrom(this.authStoreFacade.isAuthenticated$);
    return !isAuthenticated;
  }

  async canMatch(route: Route, segments: UrlSegment[]): Promise<boolean | UrlTree> {
    const isAuthenticated = await firstValueFrom(this.authStoreFacade.isAuthenticated$);
    console.log('CAN MATCH', isAuthenticated);
    return !isAuthenticated;
  }
}
