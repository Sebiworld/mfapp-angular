import { SupportedLanguage } from '@services/translation.service';
import { ApiTemplate } from './api-template.model';

export interface ApiPage {
  id: number;
  name: string;
  language: SupportedLanguage;
  url: string;
  urls?: { [key: string]: string };
  httpUrl: string;
  template: ApiTemplate;
  created: number;
  modified: number;
  title: string;
  hash?: string;
};
