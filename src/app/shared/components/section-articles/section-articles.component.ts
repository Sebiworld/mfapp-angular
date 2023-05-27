import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import EffectCarousel from '@shared/misc/effect-carousel.esm.js';

import { ApiDefaultPage } from '@services/pages/+store/api-default-page.model';

@Component({
  selector: 'app-section-articles',
  templateUrl: './section-articles.component.html',
  styleUrls: ['./section-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionArticlesComponent implements OnInit {

  @Input() articles: ApiDefaultPage[];

  public swiperConfig: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 16,
    navigation: true,
    mousewheel: true,
    keyboard: true,
    modules: [EffectCarousel],
    // @ts-ignore
    effect: 'carousel',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
