import { ContentBlock } from './content-block.model';

export interface ContentText extends ContentBlock {
  title: string;
  hide_title: boolean;
  text: string;
};
