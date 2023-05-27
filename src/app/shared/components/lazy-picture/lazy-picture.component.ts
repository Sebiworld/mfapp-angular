import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { isEqual as _isEqual } from 'lodash-es';

import { environment } from '@env/environment';
import { ApiService } from '@services/api/api.service';

import { ApiImage } from '@models/api-image.model';

import mimetypes from './mimetypes.json';

@Component({
  selector: 'app-lazy-picture',
  templateUrl: './lazy-picture.component.html',
  styleUrls: ['./lazy-picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyPictureComponent implements OnInit, OnChanges {

  @Input() pictureClasses?: string;
  @Input() apiImage?: ApiImage;
  @Input() default?: { [key: string]: any } = {};
  @Input() media?: {
    [key: string]: { [key: string]: any };
  } = {};

  private _img$ = new BehaviorSubject<{
    src: string;
    placeholderSrc?: string;
    class?: string;
    alt?: string;
    lowSrc?: string;
  }>(null);
  public readonly img$ = this._img$.asObservable().pipe(
    // tap(val => console.log('val', val)),
    // filter(img => !!img && !!img.src),
    distinctUntilChanged((prev, curr) => _isEqual(prev, curr))
  );

  private _sources$ = new BehaviorSubject<{ srcset: string; type: string; media?: string }[]>([]);
  public readonly sources$ = this._sources$.asObservable().pipe(
    distinctUntilChanged((prev, curr) => _isEqual(prev, curr))
  );

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.updateImg();
    this.updateSources();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateImg();
    this.updateSources();
  }

  getMimetypeForExt(ext: string) {
    return mimetypes['.' + ext];
  }

  getImgUrl(apiImage: ApiImage, opts: { [key: string]: any } = {}, srcSet: boolean = false): string {
    if (!apiImage) { return ''; }

    const params: { [key: string]: any } = {
      api_key: environment.apiKey,
      file: apiImage.basename
    };

    if (opts?.width) {
      params.width = opts.width;
    }
    if (opts?.height) {
      params.height = opts.height;
    }
    if (opts?.webp) {
      params.webp = opts.webp;
    }

    let imgurl = this.apiService.getFileUrl('' + apiImage.page_id, params);
    if (!srcSet) { return imgurl; }

    imgurl += ' 1x, ';
    if (params.width) {
      params.width = params.width * 2;
    }
    if (params.height) {
      params.height = params.height * 2;
    }
    imgurl += this.apiService.getFileUrl('' + apiImage.page_id, params) + ' 2x';

    return imgurl;
  }

  updateImg() {
    const apiImage = this.default?.apiImage || this.apiImage;

    if (apiImage) {
      const img: any = {
        src: this.getImgUrl(apiImage, this.default),
        class: 'lazyload'
      };

      if (this.default?.class) {
        img.class = img.class + ' ' + this.default.class;
      }

      if (this.default?.alt) {
        img.alt = this.default.alt;
      } else if (apiImage.description) {
        img.alt = apiImage.description;
      }

      if (this.default?.low_src) {
        img.lowSrc = this.default.low_src;
      } else if (apiImage.low_src) {
        img.lowSrc = apiImage.low_src;
      }

      this._img$.next(img);
    }
  }

  updateSources() {
    if (!this.media || typeof this.media !== 'object') { return; }

    const sources: { srcset: string; type: string; media?: string }[] = [];
    for (const condition in this.media) {
      if (!this.media[condition]) { continue; }

      const sourceOptions = this.media[condition];
      if (!sourceOptions || typeof sourceOptions !== 'object') { continue; }
      const apiImage: ApiImage = sourceOptions?.apiImage || this.apiImage;
      if (!apiImage) { continue; }
      if (sourceOptions?.apiImage && !['jpg', 'jpeg', 'png'].includes(apiImage.ext)) { continue; }

      sources.push({
        srcset: this.getImgUrl(apiImage, sourceOptions, true),
        type: this.getMimetypeForExt(apiImage.ext),
        media: condition
      });

      if (!['jpg', 'jpeg', 'png'].includes(apiImage.ext)) { continue; }

      sources.push({
        srcset: this.getImgUrl(apiImage, { ...sourceOptions, webp: true }, true),
        type: this.getMimetypeForExt('webp'),
        media: condition
      });
    }
    // Add default without condition (if not svg)
    if (this.apiImage && ['jpg', 'jpeg', 'png'].includes(this.apiImage.ext)) {
      sources.push({
        srcset: this.getImgUrl(this.apiImage, this.default, true),
        type: this.getMimetypeForExt(this.apiImage.ext)
      });
      sources.push({
        srcset: this.getImgUrl(this.apiImage, { ...this.default, webp: true }, true),
        type: this.getMimetypeForExt('webp'),
      });
    }
    this._sources$.next(sources);
  }
}
