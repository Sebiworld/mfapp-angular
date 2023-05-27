import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ContentBlock } from '@models/content/content-block.model';

export interface ComponentLoader { [key: string]: () => Promise<any> };

@Component({
  selector: 'app-content-blocks',
  templateUrl: './content-blocks.component.html',
  styleUrls: ['./content-blocks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentBlocksComponent implements OnInit, OnChanges {

  @Input() darkMode = false;
  @Input() locale: string;

  @Input() contentComponents: ComponentLoader = {};

  private _contents;

  get contents(): Array<ContentBlock> {
    return this._contents;
  }

  @Input()
  set contents(val: Array<ContentBlock>) {
    this._contents = val;
  }

  private readonly defaultContentComponents: ComponentLoader = {
    text: () => import('./components/content-text/content-text.component').then(
      m => m.ContentTextComponent
    ),
    container: () => import('./components/content-container/content-container.component').then(
      m => m.ContentContainerComponent
    ),
    image: () => import('./components/content-image/content-image.component').then(
      m => m.ContentImageComponent
    ),
    gallery: () => import('./components/content-gallery/content-gallery.component').then(
      m => m.ContentGalleryComponent
    ),
    lottie: () => import('./components/content-lottie/content-lottie.component').then(
      m => m.ContentLottieComponent
    ),
    tabs: () => import('./components/content-tabs/content-tabs.component').then(
      m => m.ContentTabsComponent
    ),
    pages: () => import('./components/content-pages/content-pages.component').then(
      m => m.ContentPagesComponent
    ),
  };

  private _contentComponents$: BehaviorSubject<ComponentLoader> = new BehaviorSubject(this.defaultContentComponents);
  public readonly contentComponents$ = this._contentComponents$.asObservable();

  constructor() { }

  ngOnInit() {
    if (this.contentComponents) {
      this._contentComponents$.next({ ...this.defaultContentComponents, ...this.contentComponents });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contentComponents && this.contentComponents) {
      this._contentComponents$.next({ ...this.defaultContentComponents, ...this.contentComponents });
    }
  }

}
