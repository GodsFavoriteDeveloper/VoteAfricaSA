import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'discover',
        children: [
          {
            path: '',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('./discover/discover.module').then(m => m.DiscoverPageModule)
              },
              {
                path: ':officialId',
                loadChildren: () => import('./discover/official/official.module').then(m => m.OfficialPageModule)
              },
              {
                path: 'officials',
                loadChildren: () => import('./discover/officials/officials.module').then(m => m.OfficialsPageModule)
              }
            ]
          }
        ]
      },
      {
        path: 'posts',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./posts/posts.module').then(m => m.PostsPageModule)
          },
          {
            path: ':postId',
            loadChildren: () =>
              import('./posts/post/post.module').then(m => m.PostPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./profile/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: ':officialId',
            loadChildren: () => import('./discover/official/official.module').then(m => m.OfficialPageModule)
          },
        ]
      },
      {
        path: '',
        redirectTo: '/start/tabs/discover',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/start/tabs/discover',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
