import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest } from 'rxjs';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isElement as _isElement } from 'lodash-es';

import { AppStateFacade } from '@store/app-state.facade';
import { SeoService } from '@services/seo.service';
import { PageStoreFacade } from '@services/pages/+store/page-store.facade';

import { Section } from '@models/section.model';

@Component({
  selector: 'app-default',
  templateUrl: './default.page.html',
  styleUrls: ['./default.page.scss'],
})
export class DefaultPage implements OnInit, AfterViewInit {

  @ViewChild(IonContent, { static: false }) ionContent: IonContent;

  public readonly loading$ = this.pageStoreFacade.loading$;
  public readonly currentLanguage$ = this.appStateFacade.currentLanguage$;
  public readonly darkModeActivated$ = this.appStateFacade.darkModeActivated$;

  public readonly data$ = this.pageStoreFacade.currentPage$;

  public readonly notFound$ = combineLatest([this.data$, this.loading$]).pipe(
    map(([data, loading]) => !data?.id && !loading)
  );

  public readonly title$ = this.data$.pipe(map(page => page?.title));
  public readonly subtitle$ = this.data$.pipe(map(page => page?.subtitle));

  public readonly sections$ = this.data$.pipe(
    map(page => page?.sections || [])
  );
  public readonly firstSectionId$ = this.sections$.pipe(
    filter(sections => typeof sections === 'object' && Array.isArray(sections) && sections.length >= 1),
    map(sections => sections[0].section_name)
  );

  public sectionIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appStateFacade: AppStateFacade,
    private pageStoreFacade: PageStoreFacade,
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.data$.pipe(
      tap(data => this.seoService.setSeo(data?.seo ?? {}, data?.urls)),
      takeUntilDestroyed()
    ).subscribe();
  }

  ngAfterViewInit() {
    // Scroll to Achor (if set):
    combineLatest([
      this.activatedRoute.fragment,
      this.data$
    ]).pipe(
      filter(([fragment, data]) => !!data && !!fragment && typeof fragment === 'string' && fragment.length >= 1),
      debounceTime(200),
      switchMap(async ([fragment]) => {
        if (!this.ionContent) { return; }
        const anchor = document.getElementById(fragment);
        if (typeof anchor !== 'object' || !_isElement(anchor) || anchor?.offsetTop === undefined) { return; }
        const offsetTop = anchor.offsetTop;

        const scrollElement = await this.ionContent.getScrollElement();
        const scrollTop = scrollElement?.scrollTop;
        const height = scrollElement?.clientHeight;

        if (!height) { return; }
        if (scrollTop <= offsetTop && scrollTop + height >= offsetTop) {
          return;
        }

        this.ionContent.scrollByPoint(0, anchor.offsetTop, 0);
      }),
      takeUntilDestroyed()
    ).subscribe();
  }

  scrollToElement(elementId: string) {
    if (!this.ionContent) { return; }
    const targetElement = document.getElementById(elementId);
    if (typeof targetElement !== 'object' || !(targetElement instanceof Element)) { return; }
    this.ionContent.scrollToPoint(0, targetElement.offsetTop, 500);
  }

  sectionById(index, item: Section) {
    return item.id;
  }
}
