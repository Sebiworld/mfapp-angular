import { PageCard } from '@models/page-card.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ApiArchivePage } from './api-archive-page.model';

export const ArchiveActions = createActionGroup({
  source: 'ARCHIVE',
  events: {
    'Load Archive By Path': props<{ path: string; offset?: number; limit?: number }>(),
    'Load Archive Success': props<{ page: ApiArchivePage; items: PageCard[] }>(),
    'Load Archive Not Modified': emptyProps(),
    'Load Archive Failure': props<{ error: any }>()
  }
});
