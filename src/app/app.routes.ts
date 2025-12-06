import { Routes } from '@angular/router'
import SideComponent from 'src/view/side/index.component'

export const routes: Routes = [
  {
    path: '',
    component: SideComponent,
    data: {}
  },
  {
    path: 'side',
    component: SideComponent,
    data: {}
  },
  {
    path: 'system',
    loadComponent: () => import('src/view/system/index.component'),
    children: [
      {
        path: 'info',
        loadComponent: () => import('src/view/system/info/index.component')
      },
      {
        path: 'bookmark',
        loadComponent: () => import('src/view/system/bookmark/index.component')
      },
      {
        path: 'bookmarkExport',
        loadComponent: () =>
          import('src/view/system/bookmark-export/index.component')
      },
      {
        path: 'collect',
        loadComponent: () => import('src/view/system/collect/index.component')
      },
      {
        path: 'auth',
        loadComponent: () => import('src/view/system/auth/index.component')
      },
      {
        path: 'tag',
        loadComponent: () => import('src/view/system/tag/index.component')
      },
      {
        path: 'search',
        loadComponent: () => import('src/view/system/search/index.component')
      },
      {
        path: 'setting',
        loadComponent: () => import('src/view/system/setting/index.component')
      },
      {
        path: 'component',
        loadComponent: () =>
          import('src/view/system/component/index.component')
      },
      {
        path: 'web',
        loadComponent: () => import('src/view/system/web/index.component')
      },
      {
        path: 'config',
        loadComponent: () => import('src/view/system/config/index.component')
      },
      {
        path: '**',
        redirectTo: '/system/web'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/side'
  }
]
