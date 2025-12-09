import { Component, OnInit } from '@angular/core';
import { COMMON_IMPORTS } from '../../shared/constants/import-modules';
import { TablaDinamicaComponent } from '../../shared/components/tabla-dinamica/tabla-dinamica.component';
import { ConfigTablaCompra } from './config-tabla-compra';
import { AccionFormat, ActionEvent } from '../../shared/components/tabla-dinamica/dynamic-table.models';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { CompraService } from '../../core/services/compra.service';
import { ModalFormService } from '../../shared/service/modal-form.service';
import { MensajeAlertService } from '../../shared/service/alert.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
  standalone: true,
    imports: [
      COMMON_IMPORTS, TablaDinamicaComponent
    ]
})
export class ComprasComponent implements OnInit {

  estadoGrid = true;
  gridCompra = new ConfigTablaCompra();
  idSeleccionado: string = '';

  constructor(
    private readonly compraService :  CompraService,
    private readonly modalFormService: ModalFormService,
    private readonly mensaje: MensajeAlertService
  ){ }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(page = 0, size = 5, sort = 'fechaRegistro,desc'){
    const parms = { esPaginado: true, pagina: page, items: size, estado: this.estadoGrid, sort };

    this.compraService.getPagination(parms).subscribe(response => {
      if(response){
        this.gridCompra.cargarDatos(response.data);
        this.gridCompra.setPagination(response.pagina, response.items, response.total);
        this.gridCompra.recargar();
      }
    });
  }

  onAgregar(){}

  onFiltrar(){}

  handleActionEvent(event: ActionEvent): void {

    if (event.action === AccionFormat.eliminar) {
      //this.eliminarProducto(event.rowData.id);
    }
    if (event.action === AccionFormat.editar) {
      this.idSeleccionado = event.rowData.id;
      //this.formProductos.data = event.rowData;
      this.onAgregar();
    }

  }

  handlePageEvent(event: PageEvent): void {
    //this.cargarDatos(event.pageIndex, event.pageSize);
  }

  handleSortEvent(event: Sort): void {
    const sort = `${event.active},${event.direction}`;
    const size = this.gridCompra.options.pagination.pageSize;
    const page = this.gridCompra.options.pagination.page;
    //this.cargarDatos(page, size, sort);
  }
}
