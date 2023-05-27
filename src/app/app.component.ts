import { AfterViewInit, Component, Inject, inject, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { delay, distinctUntilChanged, filter, map, mergeMap, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { register } from 'swiper/element/bundle';
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/blur-up/ls.blur-up';
import 'lazysizes/plugins/attrchange/ls.attrchange';

if (Capacitor.isPluginAvailable('SplashScreen')) {
  SplashScreen.show({
    autoHide: false
  });
}

import { SeoService } from '@services/seo.service';
import { AppStateFacade } from '@store/app-state.facade';
import { UtilService } from '@services/util.service';
import { AuthService } from '@services/auth/auth.service';
import { AuthStoreFacade } from '@services/auth/+store/auth-store.facade';
import { AnimationHelpers } from '@shared/helpers/animation.helpers';

import { NicknameModalComponent } from '@modals/nickname-modal/nickname-modal.component';
import { LoginModalComponent } from '@modals/login-modal/login-modal.component';
import { StartupModalComponent } from '@modals/startup-modal/startup-modal.component';
import { SplashModalComponent } from '@modals/splash-modal/splash-modal.component';
import { RegisterConfirmModalComponent } from '@modals/register-confirm-modal/register-confirm-modal.component';

export const WINDOW = new InjectionToken<Window>(
  'An abstraction over global window object',
  {
    factory: () => inject(DOCUMENT).defaultView!
  },
);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  public readonly darkModeActivated$ = this.appStateFacade.darkModeActivated$;

  private _hasSystemStatusBar$ = new BehaviorSubject<boolean>(false);
  public readonly hasSystemStatusBar$ = this._hasSystemStatusBar$.asObservable().pipe(distinctUntilChanged());

  private _isMenuOpen$ = new BehaviorSubject<boolean>(false);
  public readonly isMenuOpen$ = this._isMenuOpen$.asObservable().pipe(distinctUntilChanged());

  public readonly registerConfirmToken$ = this.activatedRoute.queryParams.pipe(
    map(params => params.registration_confirm)
  );

  constructor(
    private platform: Platform,
    private seoService: SeoService,
    private appStateFacade: AppStateFacade,
    private modalController: ModalController,
    private router: Router,
    @Inject(WINDOW) readonly windowRef: Window,
    private utilService: UtilService,
    private authService: AuthService,
    private authStoreFacade: AuthStoreFacade,
    private activatedRoute: ActivatedRoute
  ) {
    this.initializeApp();
  }

  initializeApp() {
    Object.assign(lazySizes.cfg, {
      blurupMode: 'auto'
    });
    this.appStateFacade.initApp();

    if (Capacitor.isPluginAvailable('StatusBar')) {
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setOverlaysWebView({
        overlay: false
      });
      this.darkModeActivated$.pipe(
        switchMap(darkModeActivated => StatusBar.setStyle({ style: darkModeActivated ? Style.Dark : Style.Light })),
        takeUntil(this.unsubscribe$)
      ).subscribe();

      this._hasSystemStatusBar$.next(true);
    } else {
      this._hasSystemStatusBar$.next(false);
    }

    try {
      this.showSplashModal().then(() => {
        if (Capacitor.isPluginAvailable('SplashScreen')) { SplashScreen.hide(); }
        this.appStateFacade.initialized$.pipe(
          filter(initialized => initialized === true),
          // debounceTime(1000),
          take(1),
          tap(() => this.router.initialNavigation()),
          delay(100),
          tap(() => {
            this.modalController.dismiss(undefined, undefined, 'splash-modal');
            this.afterInitialization();
          }),
          takeUntil(this.unsubscribe$)
        ).subscribe();
      });
    } catch (err) {
      this.router.initialNavigation();
    }
  }

  ngOnInit() {
    this.darkModeActivated$.pipe(
      tap(darkMode => {
        document.body.classList.toggle('theme-dark', darkMode);
        document.body.classList.toggle('theme-white', !darkMode);

        // Update Favicon:
        if (darkMode) {
          this.seoService.setHeadTags([
            {
              tag: 'meta',
              selector: 'meta[name="theme-color"]',
              attributeValues: {
                name: 'theme-color',
                content: '#000000'
              }
            },
            {
              tag: 'meta',
              selector: 'meta[name="apple-mobile-web-app-status-bar-style"]',
              attributeValues: {
                name: 'apple-mobile-web-app-status-bar-style',
                content: 'black'
              }
            }
          ]);
        } else {
          this.seoService.setHeadTags([
            {
              tag: 'meta',
              selector: 'meta[name="msapplication-TileColor"]',
              attributeValues: {
                name: 'msapplication-TileColor',
                content: '#FFFFFF'
              }
            },
            {
              tag: 'meta',
              selector: 'meta[name="theme-color"]',
              attributeValues: {
                name: 'theme-color',
                content: '#FFFFFF'
              }
            },
            {
              tag: 'meta',
              selector: 'meta[name="apple-mobile-web-app-status-bar-style"]',
              attributeValues: {
                name: 'apple-mobile-web-app-status-bar-style',
                content: 'white'
              }
            }
          ]);
        }
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  private async showSplashModal() {
    const splash = await this.modalController.create({
      component: SplashModalComponent,
      backdropDismiss: false,
      keyboardClose: false,
      cssClass: 'splash-modal full-size',
      id: 'splash-modal',
      enterAnimation: AnimationHelpers.showImmediatelyAnimation
    });
    return await splash.present();
  }

  ngAfterViewInit(): void {
    register();
  }

  private async afterInitialization() {
    combineLatest([
      this.appStateFacade.isStartupFinished$,
      this.authStoreFacade.nickname$,
      this.appStateFacade.isStartupLoginFinished$,
      this.registerConfirmToken$
    ]).pipe(
      mergeMap(async ([isStartupFinished, nickname, isStartupLoginFinished, registerConfirmToken]) => {
        if (registerConfirmToken) {
          await this.showRegisterConfirmModal(registerConfirmToken);
        } else if (!isStartupFinished) {
          await this.showStartupModal();
        } else if (!nickname) {
          await this.showNicknameModal();
        } else if (!isStartupLoginFinished) {
          await this.showLoginModal();
        }
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  private async showStartupModal() {
    const modal = await this.modalController.create({
      component: StartupModalComponent,
      backdropDismiss: false,
      keyboardClose: false,
      cssClass: 'full-size',
      id: StartupModalComponent.MODAL_ID
    });
    await modal.present();
    await modal.onDidDismiss();
    this.utilService.setStartupFinished(true);
  }

  private async showNicknameModal() {
    const modal = await this.modalController.create({
      component: NicknameModalComponent,
      backdropDismiss: false,
      keyboardClose: false,
      cssClass: 'full-size',
      id: NicknameModalComponent.MODAL_ID
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result?.data?.nickname) {
      this.authService.setNickname(result.data.nickname);
    }
  }

  private async showLoginModal() {
    const modal = await this.modalController.create({
      component: LoginModalComponent,
      backdropDismiss: false,
      keyboardClose: false,
      cssClass: 'full-size',
      id: LoginModalComponent.MODAL_ID,
      componentProps: {
        isStartup: true
      }
    });
    await modal.present();
    await modal.onDidDismiss();
    this.utilService.setStartupLoginFinished(true);
  }

  private async showRegisterConfirmModal(token: string) {
    const modal = await this.modalController.create({
      component: RegisterConfirmModalComponent,
      cssClass: 'full-size',
      id: RegisterConfirmModalComponent.MODAL_ID,
      componentProps: {
        token
      }
    });
    await modal.present();
    modal.onWillDismiss().then(() => {
      this.router.navigate([], {
        queryParams: {
          registration_confirm: null
        },
        queryParamsHandling: 'merge'
      });
    });
    await modal.onDidDismiss();
  }

  menuOpened() {
    this._isMenuOpen$.next(true);
  }
  menuClosed() {
    this._isMenuOpen$.next(false);
  }
}
