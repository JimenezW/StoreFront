import { Component, OnInit } from '@angular/core';
import { COMMON_IMPORTS } from '../../shared/constants/import-modules';
import { TablaDinamicaComponent } from '../../shared/components/tabla-dinamica/tabla-dinamica.component';
import { ConfigTablaProductos } from './config-tabla-productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  standalone: true,
  imports: [
    COMMON_IMPORTS, TablaDinamicaComponent
  ]
})
export class ProductosComponent implements OnInit {

  gridProductos = new ConfigTablaProductos();
  constructor() { }

  ngOnInit() {
  }

  onAgregar(){}

  onFiltrar(){}

}
