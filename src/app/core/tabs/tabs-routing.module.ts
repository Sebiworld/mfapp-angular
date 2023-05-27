import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'members',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('@pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('@pages/calendar/calendar.module').then(m => m.CalendarPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('@pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('@pages/news/news.module').then(m => m.NewsPageModule),
        data: {
          loadType: 'news'
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
        path: '',
        redirectTo: '/members/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/members/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
