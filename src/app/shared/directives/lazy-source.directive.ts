import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';

import { environment } from '@env/environment';
import { ApiService } from '@services/api/api.service';

import { ApiImage } from '@models/api-image.model';

@Directive({
  selector: '[lazySource]'
})
export class LazySourceDirective implements OnInit, OnChanges {

  @Input() apiImage?: ApiImage;
  @Input() width?: number;
  @Input() height?: number;
  @Input() webp?: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.updateSrcSet();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateSrcSet();
  }

  updateSrcSet() {
    if (this.apiImage) {
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
        'data-srcset',
        this.apiService.getFileUrl('' + this.apiImage.page_id, params)
      );
    }
  }
}
