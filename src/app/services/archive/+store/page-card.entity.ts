import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { PageCard } from '@models/page-card.model';

const adapter: EntityAdapter<PageCard> = createEntityAdapter<PageCard>({
  selectId: (item: PageCard) => item.id,
  sortComparer: (a: PageCard, b: PageCard) => a.datetime_from - b.datetime_from
});
export interface PageCardState extends EntityState<PageCard> {

}

const initialState: PageCardState = adapter.getInitialState({});

export const PageCardEntity = {
  ...adapter.getSelectors(),
  adapter,
  initialState
};
