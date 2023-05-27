import { Component, OnInit } from '@angular/core';
import { filter, map, tap } from 'rxjs';

import { ArchiveStoreFacade } from '@services/archive/+store/archive-store.facade';
import { ArchiveService } from '@services/archive/archive.service';
import { isValidArray } from '@shared/helpers/general.helpers';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  public readonly currentPage$ = this.archiveStoreFacade.pageByPath$('/aktuelles');
  public readonly articles$ = this.currentPage$.pipe(
    filter(page => isValidArray(page?.items)),
    map(page => page?.items)
  );

  constructor(
    private archiveService: ArchiveService,
    private archiveStoreFacade: ArchiveStoreFacade
  ) { }

  ngOnInit() {
    this.archiveService.loadArchiveByPath('/aktuelles');
  }

}
