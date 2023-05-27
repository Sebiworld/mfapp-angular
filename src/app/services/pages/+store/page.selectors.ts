import { createFeatureSelector, createSelector } from '@ngrx/store';
import { trim as _trim } from 'lodash-es';

import { selectCurrentPath } from '@store/router.selectors';

import { PageReducer, PageState } from './page.reducer';

export const selectPageState = createFeatureSelector<PageState>(
  PageReducer.featureKey
);
export const selectLoading = createSelector(
  selectPageState,
  (state: PageState) => state.loading
);

export const selectPageIds = createSelector(
  selectPageState,
  PageReducer.selectIds
);
export const selectPageEntities = createSelector(
  selectPageState,
  PageReducer.selectEntities
);
export const selectAllPages = createSelector(
  selectPageState,
  PageReducer.selectAll
);
export const selectPagesTotal = createSelector(
  selectPageState,
  PageReducer.selectTotal
);

export const selectCurrentPage = createSelector(
  selectAllPages,
  selectCurrentPath,
  (pages, route) => pages?.find(page => _trim(page.url, '/') === _trim(route, '/'))
);

export const selectCurrentPageLanguage = createSelector(
  selectCurrentPage,
  page => page?.language
);

export const selectCurrentPageUrls = createSelector(
  selectCurrentPage,
  page => page?.urls ?? {}
);

export const selectCurrentPageSeo = createSelector(
  selectCurrentPage,
  page => page?.seo
);

export const selectPageByPath = (path: string) => createSelector(
  selectPageEntities,
  (pageEntities) => path && pageEntities[path]
);
