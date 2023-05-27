import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';

import { environment } from '@env/environment';
import { ApiService } from '@services/api/api.service';

import { ApiImage } from '@models/api-image.model';

// "node_modules/lazysizes/lazysizes.min.js",
// "lazysizes/plugins/parent-fit/ls.parent-fit",
// "lazysizes/plugins/blur-up/ls.blur-up",
// "lazysizes/plugins/respimg/ls.respimg",
// "lazysizes/plugins/object-fit/ls.object-fit"

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[lazyImg]'
})
export class LazyImgDirective implements OnInit, OnChanges {

  @Input() apiImage?: ApiImage;
  @Input() fallback?: string;
  @Input() width?: number;
  @Input() height?: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.updateImgSrc();
    this.renderer.addClass(this.el.nativeElement, 'lazyload');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateImgSrc();
  }

  updateImgSrc() {
    if (!this.apiImage) {
      if (this.fallback) {
        this.renderer.setAttribute(
          this.el.nativeElement,
          'data-src',
          this.fallback
        );
      }
      return;
    }

    const params: { [key: string]: any } = {
      api_key: environment.apiKey,
      file: this.apiImage.basename
    };

    if (this.width) {
      params.width = this.width;
    }
    if (this.height) {
      params.height = this.height;
    }

    this.renderer.setAttribute(
      this.el.nativeElement,
      'data-src',
      this.apiService.getFileUrl('' + this.apiImage.page_id, params)
    );
  }
}
