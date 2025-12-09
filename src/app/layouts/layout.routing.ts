import { Routes } from '@angular/router';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { Component } from '@angular/core';
import { ProductosComponent } from '../features/productos/productos.component';
import { HomeComponent } from '../features/Home/Home.component';
import urlConstRouting from '../shared/constants/url-const.routing';
import { AccessGuard } from '../core/guards/acces.guards';
import { ComprasComponent } from '../features/compras/compras.component';

const home = urlConstRouting.dashboard.base;

export const LayoutRoutes: Routes = [
  {
    path: '',
    component: SkeletonComponent,
    children: [
      { path: '', component: HomeComponent },   // /dashboard
      { path: 'productos', component: ProductosComponent },
      { path: 'compras', component: ComprasComponent}
    ],canActivate: [AccessGuard]
  },
];


