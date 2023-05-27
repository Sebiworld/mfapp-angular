import { ApiPage } from "@models/api-page.model";
import { PageCard } from "@models/page-card.model";

export interface ApiArchivePage extends ApiPage {
  items?: PageCard[];
  itemIds?: number[];
  hash?: string;
  totalNumber: number;
  moreAvailable: boolean;
  lastElementIndex: number;
};
