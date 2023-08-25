import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgProgressModule } from 'ngx-progressbar';
import { RouterModule } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { register } from 'swiper/element/bundle';
register();

import { PageCardComponent } from './components/page-card/page-card.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';

import { StripHtmlPipe } from './pipes/strip-html.pipe';
import { StripNewLinePipe } from './pipes/strip-newline.pipe';
import { NewlineToBrPipe } from './pipes/newline-to-br.pipe';
import { PadPipe } from './pipes/pad.pipe';
import { LazyImgDirective } from './directives/lazy-img.directive';
import { LazyBgDirective } from './directives/lazy-bg.directive';
import { LazySourceDirective } from './directives/lazy-source.directive';
import { LazyPictureComponent } from './components/lazy-picture/lazy-picture.component';
import { NoSanitizePipe } from './pipes/no-sanitize.pipe';
import { IntersectionObserverDirective } from './directives/intersection-observer.directive';
import { FileUrlPipe } from './pipes/file-url.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SectionSpacerComponent } from './components/section-spacer/section-spacer.component';
import { LogoComponent } from './components/logo/logo.component';
import { UnescapeHtmlPipe } from './pipes/unescape-html.pipe';
import { ArrayFindPipe } from './pipes/array-find.pipe';
import { ArrayReversePipe } from './pipes/array-reverse.pipe';
import { ArrayUniquePipe } from './pipes/array-unique.pipe';
import { CapitalizeFirstPipe } from './pipes/capitalize-first.pipe';
import { HighlightSearchPipe } from './pipes/highlight-search.pipe';
import { RoundPipe } from './pipes/round.pipe';
import { SafeSrcPipe } from './pipes/safe-src.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { StripSpacesPipe } from './pipes/strip-spaces.pipe';
import { SwiperDirective } from './directives/swiper.directive';
import { DateWithFallbackPipe } from './pipes/date-with-fallback.pipe';
import { AreDatesEqualPipe } from './pipes/are-dates-equal.pipe';
import { GroupTimespansPipe } from './pipes/group-timespans.pipe';
import { TranslateMultiPipe } from './pipes/translate-multi.pipe';

@NgModule({
  declarations: [
    PageCardComponent,
    ImageModalComponent,
    ArrayFindPipe,
    ArrayReversePipe,
    ArrayUniquePipe,
    CapitalizeFirstPipe,
    FileUrlPipe,
    HighlightSearchPipe,
    NewlineToBrPipe,
    NoSanitizePipe,
    PadPipe,
    RoundPipe,
    SafeSrcPipe,
    SafeUrlPipe,
    StripHtmlPipe,
    StripNewLinePipe,
    StripSpacesPipe,
    UnescapeHtmlPipe,
    DateWithFallbackPipe,
    AreDatesEqualPipe,
    GroupTimespansPipe,
    TranslateMultiPipe,
    LazyImgDirective,
    LazyBgDirective,
    LazySourceDirective,
    IntersectionObserverDirective,
    LazyPictureComponent,
    NotFoundComponent,
    SectionSpacerComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
    NgProgressModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LetDirective,
    SwiperDirective
  ],
  exports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
    NgProgressModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    PageCardComponent,
    ImageModalComponent,
    ArrayFindPipe,
    ArrayReversePipe,
    ArrayUniquePipe,
    CapitalizeFirstPipe,
    FileUrlPipe,
    HighlightSearchPipe,
    NewlineToBrPipe,
    NoSanitizePipe,
    PadPipe,
    RoundPipe,
    SafeSrcPipe,
    SafeUrlPipe,
    StripHtmlPipe,
    StripNewLinePipe,
    StripSpacesPipe,
    UnescapeHtmlPipe,
    DateWithFallbackPipe,
    AreDatesEqualPipe,
    GroupTimespansPipe,
    TranslateMultiPipe,
    LazyImgDirective,
    LazyBgDirective,
    LazySourceDirective,
    IntersectionObserverDirective,
    LazyPictureComponent,
    SectionSpacerComponent,
    NotFoundComponent,
    LogoComponent,
    LetDirective,
    SwiperDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe
  ]
})
export class SharedModule { }
