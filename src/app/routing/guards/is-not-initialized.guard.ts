import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, CanMatch, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AppStateFacade } from '@store/app-state.facade';

@Injectable({
  providedIn: 'root'
})
export class IsNotInitializedGuard implements CanMatch, CanActivate, CanLoad {

  constructor(
    private appStateFacade: AppStateFacade
  ) { }

  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('MATCH');
    return this.appStateFacade.initialized$.pipe(map(val => !val));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.appStateFacade.initialized$.pipe(map(val => !val));
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.appStateFacade.initialized$.pipe(map(val => !val));
  }
}
