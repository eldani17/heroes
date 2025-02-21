import { Routes } from '@angular/router';

export const HEROES_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () => import('./heroes-list/heroes-list.component').then((m) => m.HeroesListComponent),
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];
