import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges, HostListener, OnInit, OnDestroy, inject, DestroyRef } from '@angular/core';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { ApiService } from '@services/api/api.service';

import { ApiImage } from '@models/api-image.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[lazyBg]'
})
export class LazyBgDirective implements OnInit, OnChanges {

  private destroyRef = inject(DestroyRef);

  @Input() apiImage?: ApiImage;
  @Input() url?: string;
  @Input() width?: number;
  @Input() height?: number;

  @HostListener('lazybeforeunveil', ['$event.target'])
  beforeUnveil(e) {
    if (!e.getAttribute('src')) { return; }
    e.style.backgroundImage = 'url(' + e.getAttribute('src') + ')';
  }

  private _url$ = new BehaviorSubject<string>('');
  private readonly url$ = this._url$.asObservable().pipe(
    distinctUntilChanged()
  );

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.updateBackgroundImage();
    this.renderer.addClass(this.el.nativeElement, 'lazyload');

    this.url$.pipe(
      filter((url) => !!url && !!this.el?.nativeElement),
      tap(url => {
        this.renderer.setAttribute(
          this.el.nativeElement,
          'src',
          url
        );
        if (this.el.nativeElement?.style?.backgroundImage) {
          this.el.nativeElement.style.backgroundImage = 'url(' + url + ')';
        }
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateBackgroundImage();
  }

  updateBackgroundImage() {
    if (this.url) {
      this._url$.next(this.url);
      return;
    }

    if (!this.apiImage) { return; }

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

    this._url$.next(this.apiService.getFileUrl('' + this.apiImage.page_id, params));
  }
}
