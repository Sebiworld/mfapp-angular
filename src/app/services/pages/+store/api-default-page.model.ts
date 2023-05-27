import { ApiImage } from "@models/api-image.model";
import { ApiPage } from "@models/api-page.model";
import { ContentInterface } from "@models/content/content-interface.model";
import { ProjectPage } from "@models/project-page.model";
import { Section } from "@models/section.model";

export interface ApiDefaultPage extends ApiPage {
  main_image?: ApiImage;
  intro: string;
  datetime_from: number;
  sections?: Section[];
  contents?: ContentInterface[];
  subtitle?: string;
  seo?: { [key: string]: string };
  project?: ProjectPage;
  external_type: string;
  external_link?: string;
}
