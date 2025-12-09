import { Component, OnInit } from '@angular/core';
import { COMMON_IMPORTS } from '../../shared/constants/import-modules';
import { TablaDinamicaComponent } from '../../shared/components/tabla-dinamica/tabla-dinamica.component';
import { ConfigTablaProductos } from './config-tabla-productos';
import { ProductosService } from '../../core/services/productos.service';
import { AccionFormat, ActionEvent } from '../../shared/components/tabla-dinamica/dynamic-table.models';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ModalFormService } from '../../shared/service/modal-form.service';
import { ConfigFormProductos } from './config-form-productos';
import { TipoAccion } from '../../shared/components/modalform/dynamic-modalform';
import { MensajeAlertService } from '../../shared/service/alert.service';

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
  estadoGrid = true;

  constructor(
    private readonly productoService: ProductosService,
    private readonly modalFormService: ModalFormService,
    private readonly mensaje: MensajeAlertService
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  onAgregar(){
    this.modalFormService.openFormModal(this.formProductos).subscribe(result => {
      if(result && result.action === TipoAccion.save){
        this.guardarProducto(result.data);
      }
    });
  }

  onFiltrar(){}

  cargarDatos(page = 0, size = 5, sort = 'fechaRegistro,desc'){
    const parms = { esPaginado: true, pagina: page, items: size, estado: this.estadoGrid, sort };

    this.productoService.getPagination(parms).subscribe(response => {
      if(response){
        this.gridProductos.cargarDatos(response.data);
        this.gridProductos.setPagination(response.pagina, response.items, response.total);
        this.gridProductos.recargar();
      }
    });
  }

  handleActionEvent(event: ActionEvent): void {

    if (event.action === AccionFormat.eliminar) {
      this.eliminarProducto(event.rowData.id);
    }
    if (event.action === AccionFormat.editar) {
      alert(`Acción: ${event.action}\nFila: ${JSON.stringify(event.rowData)}`);

    }

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

  private guardarProducto(data: any): void {
    this.productoService.postSave(data).subscribe(response => {
      if(response){
        this.mensaje.showSuccess("Producto guardado correctamente");
        this.cargarDatos();
      } else {
        console.error('Error al guardar el producto');
      }
    });
  }

  private eliminarProducto(id: string): void {

    this.mensaje.showConfirm('¿Está seguro de eliminar el producto?').subscribe( confirm => {
      if(confirm){
        this.productoService.deleteById(id).subscribe(response => {
          if(response){
            this.mensaje.showSuccess(response);
            this.cargarDatos();
          } else {
            console.error('Error al eliminar el producto');
          }
        });
      }
    });

  }

}
