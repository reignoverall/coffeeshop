import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Ember & Oak Coffee',
    loadComponent: () => import('./pages/home').then((m) => m.Home),
  },
  {
    path: 'gallery',
    title: 'Gallery | Ember & Oak Coffee',
    loadComponent: () => import('./pages/gallery').then((m) => m.Gallery),
  },
  {
    path: 'menu',
    title: 'Menu | Ember & Oak Coffee',
    loadComponent: () => import('./pages/menu').then((m) => m.Menu),
  },
  { path: '**', redirectTo: '' },
];
