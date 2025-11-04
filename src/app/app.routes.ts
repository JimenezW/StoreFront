import { Routes } from '@angular/router';
import { LayoutRoutes } from './layouts/layout.routing';

export const routes: Routes = [
  {
    path: '',
    children: LayoutRoutes
  }
];
