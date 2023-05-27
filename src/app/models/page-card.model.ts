import { ApiImage } from "./api-image.model";
import { ApiPage } from "./api-page.model";
import { ProjectPage } from "./project-page.model";

export interface PageCard extends ApiPage {
  main_image?: ApiImage;
  intro: string;
  datetime_from: number;
  project?: ProjectPage;
  external_type: string;
  external_link?: string;
};
