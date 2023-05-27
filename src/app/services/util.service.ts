import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { isElement as _isElement } from 'lodash-es';

import { TranslationService } from '@services/translation.service';
import { AppStateFacade } from '@store/app-state.facade';
import { DarkMode } from '@store/app-state.reducer';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UtilService implements OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(
    private toastController: ToastController,
    private translationService: TranslationService,
    private storageService: StorageService,
    private appStateFacade: AppStateFacade
  ) { }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  async setDarkMode(darkMode: DarkMode, shouldSave = true) {
    this.appStateFacade.switchDarkMode(darkMode);
    if (shouldSave) { await this.storageService.set('darkMode', darkMode); }
  }

  async setStartupFinished(finished: boolean, shouldSave = true) {
    this.appStateFacade.setStartupFinished(finished);
    if (shouldSave) { await this.storageService.set('startupFinished', finished); }
  }

  async setStartupLoginFinished(finished: boolean, shouldSave = true) {
    this.appStateFacade.setStartupLoginFinished(finished);
    if (shouldSave) { await this.storageService.set('startupLoginFinished', finished); }
  }
}
