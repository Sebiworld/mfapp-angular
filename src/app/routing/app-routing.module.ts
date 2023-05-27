import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('@pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    loadChildren: () => import('@pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('@pages/user/user.module').then(m => m.UserPageModule),
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'news',
    loadChildren: () => import('@pages/news/news.module').then(m => m.NewsPageModule),
    data: {
      loadType: 'news'
    }
  },
  {
    path: 'calendar',
    loadChildren: () => import('@pages/calendar/calendar.module').then(m => m.CalendarPageModule),
    data: {
      loadType: 'calendar'
    }
  },
  {
    path: '**',
    loadChildren: () => import('@pages/default/default.module').then(m => m.DefaultPageModule),
    data: {
      loadType: 'default'
    }
  },
  {
    path: '**',
    loadChildren: () => import('@pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      initialNavigation: 'disabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // constructor(menuService: MenuService) {
  //   const href = window.location.href;
  //   if (href.indexOf('#') > -1) {
  //     menuService.defaultPage = href.substring(href.indexOf('#') + 2);
  //   }
  // }
}
