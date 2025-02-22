import { Routes } from '@angular/router';

export const HEROES_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () => import('./heroes-list/heroes-list.component').then((m) => m.HeroesListComponent),
      },
      {
        path: 'create',
        loadComponent: () => import('./heroes-create/heroes-create.component').then((m) => m.HeroesCreateComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./heroes-edit/heroes-edit.component').then((m) => m.HeroesEditComponent),
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];
