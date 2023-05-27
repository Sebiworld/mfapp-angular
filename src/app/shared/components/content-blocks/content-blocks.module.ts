import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LottieModule } from 'ngx-lottie';
import { LightgalleryModule } from 'lightgallery/angular';

import { SharedModule } from '@shared/shared.module';

import { ContentBlocksComponent } from './content-blocks.component';
import { ContentGalleryComponent } from './components/content-gallery/content-gallery.component';
import { ContentTextComponent } from './components/content-text/content-text.component';
import { ReplacePlaceholdersPipe } from '@shared/pipes/replace-placeholders.pipe';
import { ContentImageComponent } from './components/content-image/content-image.component';
import { ContentBlockComponent } from './components/content-block/content-block.component';
import { ContentContainerComponent } from './components/content-container/content-container.component';
import { ContentLottieComponent } from './components/content-lottie/content-lottie.component';
import { ContentTabsComponent } from './components/content-tabs/content-tabs.component';
import { ContentBlockHostDirective } from './components/content-block/content-block-host.directive';
import { ContentPagesComponent } from './components/content-pages/content-pages.component';

export const playerFactory = () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');

@NgModule({
  imports: [
    SharedModule,
    LottieModule.forRoot({ player: playerFactory }),
    LightgalleryModule
  ],
  declarations: [
    ContentBlocksComponent,
    ContentGalleryComponent,
    ContentContainerComponent,
    ContentTextComponent,
    ContentImageComponent,
    ReplacePlaceholdersPipe,
    ContentBlockComponent,
    ContentLottieComponent,
    ContentTabsComponent,
    ContentBlockHostDirective,
    ContentPagesComponent
  ],
  exports: [
    ContentBlocksComponent,
    ContentGalleryComponent,
    ContentContainerComponent,
    ContentTextComponent,
    ContentImageComponent,
    ReplacePlaceholdersPipe,
    ContentBlockComponent,
    ContentLottieComponent,
    ContentPagesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContentBlocksModule { }
