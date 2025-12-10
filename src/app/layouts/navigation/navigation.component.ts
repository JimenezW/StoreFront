import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { MenuItem } from '../../shared/components/menu/menu.model';
import urlConstRouting from '../../shared/constants/url-const.routing';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  imports: [
    MenuComponent
  ]
})
export class NavigationComponent implements OnInit {

  base = urlConstRouting.dashboard.base;

  menuOptions: MenuItem[] = [
    {
      title: 'Home',
      icon: 'home',
      route: '/'+ this.base,
      typeAccion : 'link'
    },
    {
      title: 'Productos',
      icon: 'local_mall',
      typeAccion: 'NA',
      children: [
        {
          title: 'Productos',
          icon: 'ballot',
          route: `/${this.base}/${urlConstRouting.productos.base}`,
          typeAccion: 'link'
        },
        {
          title: 'Comprar',
          icon: 'shopping_cart',
          route: `/${this.base}/${urlConstRouting.compras.base}`,
          typeAccion: 'link'
        },
        {
          title: 'Proveedores',
          icon: 'inventory_2',
          route: `/${this.base}/${urlConstRouting.provedor.base}`,
          typeAccion: 'link'
        },
        {
          title: 'Inventario',
          icon: 'inventory_2',
          route: '/usuarios/asig-permiso',
          typeAccion: 'link'
        }
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
