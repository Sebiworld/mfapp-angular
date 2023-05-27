import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { SwiperOptions } from "swiper";

@Directive({
  selector: '[appSwiper]',
  standalone: true,
})
export class SwiperDirective implements OnDestroy, AfterViewInit {

  @Input() config?: SwiperOptions;

  private timeoutId;

  constructor(
    private el: ElementRef<HTMLElement>
  ) { }

  ngAfterViewInit() {
    Object.assign(this.el.nativeElement, this.config);

    // @ts-ignore
    this.timeoutId = setTimeout(() => this.el.nativeElement.initialize(), 0);
  }

  ngOnDestroy(): void {
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}
