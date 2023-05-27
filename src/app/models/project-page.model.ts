import { ApiImage } from "./api-image.model";
import { ApiPage } from "./api-page.model";

export interface ProjectPage extends ApiPage {
  main_image?: ApiImage;
  color?: string;
};
