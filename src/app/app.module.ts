import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Drivers } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxMatomoTrackerModule } from '@ngx-matomo/tracker';
import { NgxMatomoRouterModule } from '@ngx-matomo/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@env/environment';

import { AppStateReducer } from '@store/app-state.reducer';
import { AppStateEffects } from '@store/app-state.effects';
import { SidemenuModule } from '@core/sidemenu/sidemenu.module';
import { HeaderModule } from '@core/header/header.module';
import { FooterModule } from '@core/footer/footer.module';
import { LoaderModule } from '@core/loader/loader.module';
import { AppRoutingModule } from '@routing/app-routing.module';
import { AuthModule } from '@services/auth/auth.module';

import { AppComponent } from './app.component';
import { PagesModule } from '@services/pages/pages.module';
import { StartupModalModule } from '@modals/startup-modal/startup-modal.module';
import { SplashModalModule } from '@modals/splash-modal/splash-modal.module';
import { ArchiveModule } from '@services/archive/archive.module';
import { AuthInterceptor } from '@services/api/auth-interceptor';
import { ApikeyInterceptor } from '@services/api/apikey-interceptor';
import { NicknameModalModule } from '@modals/nickname-modal/nickname-modal.module';
import { LoginModalModule } from '@modals/login-modal/login-modal.module';
import { HotToastModule } from '@ngneat/hot-toast';
import { RegisterConfirmModalModule } from '@modals/register-confirm-modal/register-confirm-modal.module';
import { CalendarModule } from '@services/calendar/calendar.module';

export const HttpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot({
      rippleEffect: true,
      mode: 'ios'
    }),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__mfapp',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    StoreModule.forRoot({ router: routerReducer }, {
      runtimeChecks: {
        strictStateImmutability: !environment.production,
        strictActionImmutability: !environment.production,
        strictStateSerializability: !environment.production,
        strictActionSerializability: !environment.production,
        strictActionWithinNgZone: !environment.production,
        strictActionTypeUniqueness: !environment.production
      }
    }),
    EffectsModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument(
      {
        name: 'mfapp',
        maxAge: 25,
        logOnly: environment.production,
        autoPause: true
        // actionSanitizer: (action: any) => {
        //   return action && action.raw ?
        //     {
        //       ...action,
        //       raw: '<<raw data>>'
        //     } :
        //     action;
        // },
        // stateSanitizer: (state) => state.data ? {
        //   ...state,
        //   data: '<<LONG_BLOB>>'
        // } : state
      }
    ) : [],
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature(AppStateReducer.featureKey, AppStateReducer.reducer),
    EffectsModule.forFeature([AppStateEffects]),
    PagesModule,
    ArchiveModule,
    AuthModule,
    CalendarModule,

    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
    // NgxMatomoTrackerModule.forRoot({ trackerUrl: 'https://statistik.musical-fabrik.de/', siteId: '2' }),
    // NgxMatomoRouterModule,
    HeaderModule,
    SidemenuModule,
    FooterModule,
    LoaderModule,
    SplashModalModule,
    StartupModalModule,
    NicknameModalModule,
    LoginModalModule,
    RegisterConfirmModalModule,
    HotToastModule.forRoot()
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApikeyInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
