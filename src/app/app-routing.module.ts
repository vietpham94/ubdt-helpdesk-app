import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'hone',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'suggestion',
    loadChildren: () => import('./pages/suggestion/suggestion.module').then(m => m.SuggestionPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'search-result',
    loadChildren: () => import('./pages/search-result/search-result.module').then(m => m.SearchResultPageModule)
  },
  {
    path: 'helpdesk-detail',
    loadChildren: () => import('./pages/helpdesk-detail/helpdesk-detail.module').then(m => m.HelpdeskDetailPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'directory',
    loadChildren: () => import('./pages/directory/directory.module').then(m => m.DirectoryPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqPageModule)
  },
  {
    path: 'project-detail',
    loadChildren: () => import('./pages/project-detail/project-detail.module').then(m => m.ProjectDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
