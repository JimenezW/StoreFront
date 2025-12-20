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
import { ConfigFormCompra } from './config-form-compra';
import { TipoAccion } from '../../shared/components/modalform/dynamic-modalform';
import { ProveedoreService } from '../../core/services/proveedores.service';
import { ProductosService } from '../../core/services/productos.service';
import { forkJoin } from 'rxjs';

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
  configForm = new ConfigFormCompra();
  idSeleccionado: string = '';

  constructor(
    private readonly compraService :  CompraService,
    private readonly modalFormService: ModalFormService,
    private readonly mensaje: MensajeAlertService,
    private readonly proveedorService: ProveedoreService,
    private readonly productoService : ProductosService
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

  onAgregar(){

    forkJoin({
      productos: this.productoService.getSelect(),
      proveedores: this.proveedorService.getSelect()
    }).subscribe({
      next: ({ productos, proveedores }) => {
        console.log(productos);
        console.log(proveedores);

        this.configForm.setProveedores(
          proveedores.map((p:any) => ({ value: p.id, label: p.nombre }))
        );

        this.configForm.setProductos(
          productos.map((p:any) => ({ value: p.id, label: p.nombre }))
        );


        this.initForm();
      },
      error: err => {
        console.error(err);
      }
    });

  }

  private mapSelectOption(data : any[]){
    const options = data.map(item => ({
      value: item.id,
      label: item.nombre
    }));

    return options;
  }

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

  private initForm(){
    this.modalFormService.openFormModal(this.configForm).subscribe(result => {
      if(result && result.action === TipoAccion.save){
        if(this.idSeleccionado){
          //this.actualizarProducto(result.data);
          this.idSeleccionado = '';
        } else {
          //this.guardarProducto(result.data);
        }
      }
    });
  }
}
