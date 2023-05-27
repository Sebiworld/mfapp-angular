import { ContentBlock } from './content-block.model';
import { ApiImage } from '../api-image.model';

export interface ContentGallery extends ContentBlock {
  title: string;
  hide_title: boolean;
  gallery_type: {
    id: number;
    title: string;
    value: string;
  }[];
  images: ApiImage[];
  description: string;
  text: string;
};
