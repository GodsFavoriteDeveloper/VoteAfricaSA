import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'email-login',
        loadChildren: () => import('./pages/auth/email-login/email-login.module').then(m => m.EmailLoginPageModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('./pages/auth/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
      }
    ]
  },
  {
    path: 'discover',
    loadChildren: () => import('./pages/tabs/discover/discover.module').then(m => m.DiscoverPageModule),
    canLoad: [AuthGuard]
  },
  { path: 'profile',
    loadChildren: './pages/tabs/profile/profile.module#ProfilePageModule'
  },
  {
    path: 'official',
    loadChildren: () => import('./pages/tabs/discover/official/official.module').then(m => m.OfficialPageModule)
  },
  { path: 'posts', loadChildren: './pages/tabs/posts/posts.module#PostsPageModule' },
  { path: 'post', loadChildren: './pages/tabs/posts/post/post.module#PostPageModule' },
  { path: 'walkthrough', loadChildren: './pages/walkthrough/walkthrough.module#WalkthroughPageModule' },
  { path: 'officials', loadChildren: './pages/tabs/discover/officials/officials.module#OfficialsPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
