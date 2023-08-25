import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ApiDefaultPage } from './api-default-page.model';
import { PageActions } from './page.actions';
import { AuthActions } from '@services/auth/+store/auth.actions';

const featureKey = 'pages';

export interface PageState extends EntityState<ApiDefaultPage> {
  loading: boolean;
};

const adapter: EntityAdapter<ApiDefaultPage> = createEntityAdapter<ApiDefaultPage>({
  selectId: (page: ApiDefaultPage) => page.url
});

const initialState: PageState = adapter.getInitialState({
  loading: false
});

const reducer = createReducer(
  initialState,

  on(PageActions.loadPageByPath,
    state => ({ ...state, loading: true })
  ),
  on(PageActions.loadPageSuccess,
    (state, action) => adapter.upsertOne(action.page, { ...state, loading: false })
  ),
  on(PageActions.loadPageFailure, PageActions.loadPageNotModified,
    state => ({ ...state, loading: false })
  ),
  on(PageActions.addPage,
    (state, action) => adapter.addOne(action.page, state)
  ),
  on(PageActions.upsertPage,
    (state, action) => adapter.upsertOne(action.page, state)
  ),
  on(PageActions.addPages,
    (state, action) => adapter.addMany(action.pages, state)
  ),
  on(PageActions.upsertPages,
    (state, action) => adapter.upsertMany(action.pages, state)
  ),
  on(PageActions.updatePage,
    (state, action) => adapter.updateOne(action.page, state)
  ),
  on(PageActions.updatePages,
    (state, action) => adapter.updateMany(action.pages, state)
  ),
  on(PageActions.deletePage,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PageActions.deletePages,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  // on(PageActions.loadPages,
  //   (state, action) => adapter.setAll(action.pages, state)
  // ),
  on(PageActions.clearPages,
    state => adapter.removeAll(state)
  ),

  on(AuthActions.loginSessionSuccess, AuthActions.logoutSessionSuccess, (state) => ({
    ...state,
    ...initialState
  }))
);

export const PageReducer = {
  featureKey, initialState, reducer, ...adapter.getSelectors()
};
