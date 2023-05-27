import { ApiFile } from '@models/api-file.model';

import { ContentBlock } from './content-block.model';

export interface ContentLottie extends ContentBlock {
  json: ApiFile;
  width?: number;
  height?: number;
};
