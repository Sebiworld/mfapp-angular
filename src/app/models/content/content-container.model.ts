import { ContentBlock } from './content-block.model';

export interface ContentContainer extends ContentBlock {
  title: string;
  hide_title: boolean;
};
