import { ContentInterface } from "./content-interface.model";

export interface ContentBlock {
  type: string;
  grid_classes: string;
  classes: string;
  depth: number;
  children?: ContentInterface[];
  background_pattern?: string;
};
