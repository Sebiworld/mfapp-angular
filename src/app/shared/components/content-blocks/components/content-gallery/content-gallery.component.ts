import {
  Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy, AfterViewChecked,
  OnChanges, SimpleChanges, inject, DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { LightGallery } from 'lightgallery/lightgallery';
import { InitDetail } from 'lightgallery/lg-events';
import { LightGallerySettings } from 'lightgallery/lg-settings';
import { GalleryItem } from 'lightgallery/lg-utils';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import SwiperCore from 'swiper';
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules';
SwiperCore.use([Pagination, Navigation, Mousewheel, Keyboard]);
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperOptions } from 'swiper/types';

import { environment } from '@env/environment';
import { ApiService } from '@services/api/api.service';

import { ContentGallery } from '@models/content/content-gallery.model';
import { ApiImage } from '@models/api-image.model';

import { ContentComponent } from '../content-block/content-component.interface';

@Component({
  selector: 'app-content-gallery',
  templateUrl: './content-gallery.component.html',
  styleUrls: ['./content-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentGalleryComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges, ContentComponent {

  private destroyRef = inject(DestroyRef);

  @ViewChild('lightgalleryContainer', { static: false }) lightgalleryContainer: ElementRef;
  @ViewChild('inlineGalleryWrapper', { static: true }) inlineGalleryWrapper: ElementRef;
  @ViewChild('swiper', { static: false }) swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  @Input() depth: number = 0;
  @Input() data: ContentGallery;

  @Input() darkMode = false;
  @Input() locale: string;

  private _images$ = new BehaviorSubject<ApiImage[]>([]);
  public readonly images$ = this._images$.asObservable().pipe(
    distinctUntilChanged()
  );

  private lightGallery!: LightGallery;
  private lightGalleryItems: GalleryItem[] = [];

  public lightGallerySettings: LightGallerySettings = {
    dynamic: true,
    counter: true,
    dynamicEl: this.lightGalleryItems,
    plugins: [lgZoom, lgThumbnail],
    exThumbImage: 'data-thumb',
    download: false,
    licenseKey: environment.lgLic
  };

  public swiperConfig: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 8,
    navigation: true,
    pagination: { clickable: true },
    mousewheel: true,
    keyboard: true
  };

  private needRefresh = false;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    if (this.data?.images) {
      this._images$.next(this.data.images);
    }

    this.images$.pipe(
      tap(images => {
        this.lightGalleryItems = images.map(image => ({
          size: image.width + '-' + image.height,
          src: this.getFileUrl(image),
          thumb: this.getFileUrl(image, { width: 240 }),
          subHtml: image.caption,
          alt: image.description
        }));
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  ngAfterViewInit() {
    register();
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh(this.lightGalleryItems);
      this.needRefresh = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      if (this.data?.images) {
        this._images$.next(this.data.images);
      }
    }
  }

  private getFileUrl(apiImage: ApiImage, opts: { [key: string]: any } = {}) {
    if (!apiImage) { return; }
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

    return this.apiService.getFileUrl('' + apiImage.page_id, params);
  }

  onLightGalleryInit = (initDetail: InitDetail) => {
    this.lightGallery = initDetail.instance;
  };

  onLightGalleryAfterSlide = (details) => {
    if (this.swiper && details?.index !== undefined) {
      this.swiper.slideTo(details.index);
    }
  };

  // onSwiperInit(eventParams: Parameters<SwiperEvents['afterInit']>) {
  //   const [Swiper] = eventParams;
  //   setTimeout(() => {
  //     if (!Swiper) { return; }
  //     Swiper.update();
  //     if (Swiper.navigation) {
  //       Swiper.navigation.update();
  //     }
  //   }, 500);
  // }

  openGallery(index: number = 0) {
    this.lightGallery.refresh(this.lightGalleryItems);
    this.lightGallery.openGallery(index);
  };

  trackImage(index, item: ApiImage) {
    return item.basename, item.modified;
  }
}
