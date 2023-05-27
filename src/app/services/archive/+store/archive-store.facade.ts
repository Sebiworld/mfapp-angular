import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { ArchiveActions } from "./archive.actions";
import * as ArchiveSelectors from './archive.selectors';

@Injectable({ providedIn: 'root' })
export class ArchiveStoreFacade {

  public readonly loading$ = this.store.select(ArchiveSelectors.selectLoading);
  public readonly pageIds$ = this.store.select(ArchiveSelectors.selectPageIds);
  public readonly pageEntities$ = this.store.select(ArchiveSelectors.selectPageEntities);
  public readonly allPages$ = this.store.select(ArchiveSelectors.selectAllPages);
  public readonly pagesTotal$ = this.store.select(ArchiveSelectors.selectPagesTotal);

  constructor(
    private store: Store
  ) { }

  pageByPath$(path: string) {
    return this.store.select(ArchiveSelectors.selectPageByPath(path));
  }

  loadArchiveByPath(path: string, offset?: number, limit?: number) {
    this.store.dispatch(ArchiveActions.loadArchiveByPath({ path, offset, limit }));
  }
}
