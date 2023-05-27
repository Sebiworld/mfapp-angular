import { Injectable } from '@angular/core';
import { PageStoreFacade } from './+store/page-store.facade';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(
    private pageStoreFacade: PageStoreFacade
  ) { }

  loadPageByPath(path: string, forceReload: boolean = false) {
    return this.pageStoreFacade.loadPageByPath(path, forceReload);
  }
}
