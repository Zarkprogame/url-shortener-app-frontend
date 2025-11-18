import { Routes } from '@angular/router';
import { AuthSuccess } from './auth-success/auth-success';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shorten/shorten').then((m) => m.Shorten),
  },
  {
    path: 'auth-success',
    component: AuthSuccess,
  },
];
