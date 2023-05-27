import { ContentInterface } from '@models/content/content-interface.model';

export interface ContentComponent {
  depth: number;
  data: ContentInterface;
  darkMode: boolean;
  locale: string;
}
