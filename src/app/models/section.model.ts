import { ApiImage } from "@models/api-image.model";
import { ContentInterface } from "@models/content/content-interface.model";
import { ApiPage } from "./api-page.model";

export interface Section {
  type: string;
  id: string;
  section_name: string;
  title: string;
  hide_title: boolean;
  highlight: boolean;
  classes: string;
  title_index: number;
  reference?: ApiPage;
  reference_label?: string;
  contents: ContentInterface[];
  main_image?: ApiImage;
  main_image_dark?: ApiImage;
  background_image?: ApiImage;
  background_image_dark?: ApiImage;
}
