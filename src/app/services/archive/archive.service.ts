import { Injectable } from '@angular/core';

import { ArchiveStoreFacade } from './+store/archive-store.facade';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(
    private archiveStoreFacade: ArchiveStoreFacade
  ) { }

  loadArchiveByPath(path: string, offset?: number, limit?: number) {
    return this.archiveStoreFacade.loadArchiveByPath(path, offset, limit);
  }
}
