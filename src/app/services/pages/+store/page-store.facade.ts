import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { PageActions } from "./page.actions";
import { PageState } from "./page.reducer";
import * as PageSelectors from './page.selectors';

@Injectable({ providedIn: 'root' })
export class PageStoreFacade {

  public readonly loading$ = this.store.select(PageSelectors.selectLoading);
  public readonly pageIds$ = this.store.select(PageSelectors.selectPageIds);
  public readonly pageEntities$ = this.store.select(PageSelectors.selectPageEntities);
  public readonly allPages$ = this.store.select(PageSelectors.selectAllPages);
  public readonly pagesTotal$ = this.store.select(PageSelectors.selectPagesTotal);
  public readonly currentPage$ = this.store.select(PageSelectors.selectCurrentPage);
  public readonly currentPageLanguage$ = this.store.select(PageSelectors.selectCurrentPageLanguage);
  public readonly currentPageUrls$ = this.store.select(PageSelectors.selectCurrentPageUrls);
  public readonly currentPageSeo$ = this.store.select(PageSelectors.selectCurrentPageSeo);

  constructor(
    private store: Store<PageState>
  ) { }

  pageByPath$(path: string) {
    return this.store.select(PageSelectors.selectPageByPath(path));
  }

  loadPageByPath(path: string, forceReload: boolean = false) {
    this.store.dispatch(PageActions.loadPageByPath({ path, forceReload }));
  }
}
