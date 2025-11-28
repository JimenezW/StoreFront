import { Component, OnInit } from '@angular/core';
import { COMMON_IMPORTS } from '../../shared/constants/import-modules';
import { TablaDinamicaComponent } from '../../shared/components/tabla-dinamica/tabla-dinamica.component';
import { ConfigTablaProductos } from './config-tabla-productos';
import { ProductosService } from '../../core/services/productos.service';
import { ActionEvent } from '../../shared/components/tabla-dinamica/dynamic-table.models';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ModalFormService } from '../../shared/service/modal-form.service';
import { ConfigFormProductos } from './config-form-productos';

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
  formProductos = new ConfigFormProductos();

  constructor(private readonly productoService: ProductosService,
    private readonly modalFormService: ModalFormService
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  onAgregar(){
    this.modalFormService.openFormModal(this.formProductos).subscribe(result => {
      if(result && result.action === 'save'){

      }
    });
  }

  onFiltrar(){}

  cargarDatos(page = 0, size = 5, sort = 'fechaRegistro,desc'){
    const parms = { esPaginado: true, pagina: page, items: size, estado: true, sort };

    this.productoService.getPagination(parms).subscribe(response => {
      if(response){
        this.gridProductos.cargarDatos(response.data);
        this.gridProductos.setPagination(response.pagina, response.items, response.total);
        this.gridProductos.recargar();
      }
    });
  }

  handleActionEvent(event: ActionEvent): void {
    alert(`Acción: ${event.action}\nFila: ${JSON.stringify(event.rowData)}`);
  }

  handlePageEvent(event: PageEvent): void {
    this.cargarDatos(event.pageIndex, event.pageSize);
  }

  handleSortEvent(event: Sort): void {
    const sort = `${event.active},${event.direction}`;
    const size = this.gridProductos.options.pagination.pageSize;
    const page = this.gridProductos.options.pagination.page;
    this.cargarDatos(page, size, sort);
  }

}
