import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { MenuItem } from '../../shared/components/menu/menu.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  imports: [
    MenuComponent
  ]
})
export class NavigationComponent implements OnInit {

  menuOptions: MenuItem[] = [
    {
    title: 'Home',
    icon: 'home',
    route: '',
    typeAccion: 'NA'
    },
    {
      title: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      typeAccion : 'link'
    },
    {
      title: 'Productos',
      icon: 'local_mall',
      typeAccion: 'NA',
      children: [
        {
          title: 'Comprar',
          icon: 'shopping_cart',
          route: '/comprar',
          typeAccion: 'link' },
        {
          title: 'Inventario',
          icon: 'inventory_2',
          route: '/usuarios/asig-permiso',
          typeAccion: 'link' }
      ]
    },
    {
      title: 'Ventas',
      icon: 'sell',
      typeAccion: 'NA',
      children: [
        {
          title: 'Lista',
          icon: 'person',
          route: '/ventas/lista',
          typeAccion:'link' },
        {
          title: 'Reportes',
          icon: 'report',
          route: '/ventas/reportes',
          typeAccion:'link'
        }
      ]
    },
    {
      title: 'Salir',
      icon: 'logout',
      route: '/logout',
      typeAccion: 'link'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
