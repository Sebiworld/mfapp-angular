import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { PageStoreFacade } from '@services/pages/+store/page-store.facade';
import { PagesService } from '@services/pages/pages.service';
import { AppStateFacade } from '@store/app-state.facade';

import { ApiHomePage } from './home-page.model';
import { AuthStoreFacade } from '@services/auth/+store/auth-store.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private readonly currentPage$ = this.pageStoreFacade.pageByPath$('/') as Observable<ApiHomePage>;
  public readonly articles$ = this.currentPage$.pipe(map(page => page?.articles?.items));
  public readonly nickname$ = this.authStoreFacade.nickname$;

  constructor(
    private pagesService: PagesService,
    private pageStoreFacade: PageStoreFacade,
    private appStateFacade: AppStateFacade,
    private authStoreFacade: AuthStoreFacade
  ) { }

  ngOnInit() {
    this.pagesService.loadPageByPath('/');
  }

}
