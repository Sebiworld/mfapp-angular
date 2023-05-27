import { PageCard } from '@models/page-card.model';

import { ContentBlock } from './content-block.model';

export interface ContentPages extends ContentBlock {
  title?: string;
  hide_title?: boolean;
  items: PageCard[];
};
