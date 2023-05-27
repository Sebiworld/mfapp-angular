import { ContentBlock } from './content-block.model';

export interface ContentTabs extends ContentBlock {
  title: string;
  hide_title: boolean;
  tab_mode: 'tabs' | 'accordion';
  items: ContentTabItem[];
};

export interface ContentTabItem extends ContentBlock {
  title: string;
  text?: string;
};
