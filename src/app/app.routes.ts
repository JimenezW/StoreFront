import { Routes } from '@angular/router';
import { LayoutRoutes } from './layouts/layout.routing';
import { AccessGuard } from './core/guards/acces.guards';
import { AuthRoutes } from './features/auth/auth.routes';
import { AuthGuard } from './core/guards/aut.guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: AuthRoutes,
    //canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    children: LayoutRoutes,
    canActivate: [AccessGuard]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
