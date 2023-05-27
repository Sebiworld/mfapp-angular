import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ApiDefaultPage } from './api-default-page.model';

export const PageActions = createActionGroup({
  source: 'PAGE',
  events: {
    'Load Page By Path': props<{ path: string; forceReload?: boolean }>(),
    'Load Page Success': props<{ page: ApiDefaultPage }>(),
    'Load Page Not Modified': emptyProps(),
    'Load Page Failure': props<{ error: any }>(),
    'Add Page': props<{ page: ApiDefaultPage }>(),
    'Add Pages': props<{ pages: ApiDefaultPage[] }>(),
    'Upsert Page': props<{ page: ApiDefaultPage }>(),
    'Upsert Pages': props<{ pages: ApiDefaultPage[] }>(),
    'Update Page': props<{ page: Update<ApiDefaultPage> }>(),
    'Update Pages': props<{ pages: Update<ApiDefaultPage>[] }>(),
    'Delete Page': props<{ id: string }>(),
    'Delete Pages': props<{ ids: string[] }>(),
    'Clear Pages': emptyProps()
  }
});

