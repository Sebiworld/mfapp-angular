import { ContentBlock } from "./content-block.model";
import { ContentGallery } from "./content-gallery.model";
import { ContentImage } from "./content-image.model";
import { ContentLottie } from "./content-lottie.model";
import { ContentPages } from "./content-pages.model";
import { ContentTabs } from "./content-tabs.model";
import { ContentText } from "./content-text.model";
import { ContentTimeline } from "./content-timeline.model";

export type ContentInterface =
  ContentBlock | ContentText | ContentGallery | ContentImage | ContentTimeline | ContentLottie | ContentPages | ContentTabs;
