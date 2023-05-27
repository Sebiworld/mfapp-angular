import { createFeatureSelector, createSelector } from '@ngrx/store';
import { trim as _trim } from 'lodash-es';

import { selectCurrentPath } from '@store/router.selectors';

import { ArchiveState, ArchiveReducer } from './archive.reducer';
import { ApiArchivePage } from './api-archive-page.model';
import { PageCardEntity } from './page-card.entity';

export const selectPageState = createFeatureSelector<ArchiveState>(
  ArchiveReducer.featureKey
);

export const selectLoading = createSelector(
  selectPageState,
  (state: ArchiveState) => state.loading
);

export const selectPageIds = createSelector(
  selectPageState,
  ArchiveReducer.selectIds
);
export const selectPageEntities = createSelector(
  selectPageState,
  ArchiveReducer.selectEntities
);
export const selectAllPages = createSelector(
  selectPageState,
  ArchiveReducer.selectAll
);
export const selectPagesTotal = createSelector(
  selectPageState,
  ArchiveReducer.selectTotal
);

export const selectPageCardState = createSelector(selectPageState, (state: ArchiveState) => state.pageCards);
export const selecPageCardIds = createSelector(selectPageCardState, PageCardEntity.selectIds);
export const selectPageCardEntities = createSelector(selectPageCardState, PageCardEntity.selectEntities);
export const selectAllPageCards = createSelector(selectPageCardState, PageCardEntity.selectAll);
export const selectPageCardsTotal = createSelector(selectPageCardState, PageCardEntity.selectTotal);

export const selectCurrentPage = createSelector(
  selectAllPages,
  selectCurrentPath,
  (pages, route) => pages.find(page => _trim(page.url, '/') === _trim(route, '/'))
);

export const selectPageByPath = (path: string) => createSelector(
  selectAllPages, selectPageCardEntities,
  (archivePages, pageCardEntities): ApiArchivePage => {
    if (!path) { return null; }
    const archivePage = archivePages.find(p => _trim(p.url, '/') === _trim(path, '/'));
    if (!archivePage?.id) { return null; }
    const items = archivePage.itemIds?.map(id => pageCardEntities[id]).filter(p => !!p?.id);
    return {
      ...archivePage,
      items
    };
  }
);
