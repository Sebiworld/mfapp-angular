import { ApiFile } from './api-file.model';

/*
  "basename": "logo_der_medicus_webkopf_1600x600pix.png",
  "name": "logo_der_medicus_webkopf_1600x600pix.png",
  "description": "",
  "created": 1534093255,
  "modified": 1534093255,
  "filesize": 976411,
  "filesizeStr": "954 kB",
  "page_id": 3478,
  "ext": "png",
  "basename_mini": "logo_der_medicus_webkopf_1600x600pix.600x0.png",
  "width": 1600,
  "height": 600,
  "dimension_ratio": 2.67,
  "caption": ""
*/

export interface ApiImage extends ApiFile {
  dimension_ratio: number;
  basename_mini: string;
  width: number;
  height: number;
  low_src?: string;
};
