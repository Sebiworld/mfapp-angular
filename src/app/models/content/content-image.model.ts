import { ApiImage } from '@models/api-image.model';

import { ContentBlock } from './content-block.model';

export interface ContentImage extends ContentBlock {
  image: ApiImage;
};
