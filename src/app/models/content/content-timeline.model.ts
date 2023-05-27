import { ContentBlock } from './content-block.model';

export interface ContentTimeline extends ContentBlock {
  title: string;
  hide_title: boolean;
  items: ContentTimelineItem[];
  height_top?: number;
  height_bottom?: number;
};

export interface ContentTimelineItem extends ContentBlock {
  title: string;
  subtitle?: string;
  text?: string;
  datetime_from?: number;
  datetime_until?: number;
};
