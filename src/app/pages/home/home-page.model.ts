import { ApiDefaultPage } from "@services/pages/+store/api-default-page.model";

export interface ApiHomePage extends ApiDefaultPage {
  articles: {
    items: ApiDefaultPage[];
    lastElementIndex: number;
    moreAvailable: boolean;
    totalNumber: number;
  };
}
