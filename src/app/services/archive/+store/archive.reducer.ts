import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { ApiArchivePage } from './api-archive-page.model';
import { ArchiveActions } from './archive.actions';
import { PageCardEntity, PageCardState } from './page-card.entity';

const featureKey = 'archive';

export interface ArchiveState extends EntityState<ApiArchivePage> {
  loading: boolean;
  pageCards: PageCardState;
}

const adapter: EntityAdapter<ApiArchivePage> = createEntityAdapter<ApiArchivePage>();

const initialState: ArchiveState = adapter.getInitialState({
  loading: false,
  pageCards: PageCardEntity.initialState
});

const reducer = createReducer(
  initialState,

  on(ArchiveActions.loadArchiveByPath,
    state => ({ ...state, loading: true })
  ),
  on(ArchiveActions.loadArchiveSuccess,
    (state, action) => adapter.upsertOne(action.page, {
      ...state,
      pageCards: PageCardEntity.adapter.upsertMany(action.items, state.pageCards),
      loading: false
    })
  ),
  on(ArchiveActions.loadArchiveFailure, ArchiveActions.loadArchiveNotModified,
    state => ({ ...state, loading: false })
  ),

);

export const ArchiveReducer = {
  featureKey, initialState, reducer,
  ...adapter.getSelectors()
};
