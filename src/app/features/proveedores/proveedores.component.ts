import { Component, OnInit } from '@angular/core';
import { COMMON_IMPORTS } from '../../shared/constants/import-modules';
import { TablaDinamicaComponent } from '../../shared/components/tabla-dinamica/tabla-dinamica.component';
import { ConfigTablaProveedores } from './config-tabla-proveedores';
import { ProveedoreService } from '../../core/services/proveedores.service';
import { ModalFormService } from '../../shared/service/modal-form.service';
import { MensajeAlertService } from '../../shared/service/alert.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { AccionFormat, ActionEvent } from '../../shared/components/tabla-dinamica/dynamic-table.models';
import { ConfigFormProveedor } from './config-form-proveedores';
import { TipoAccion } from '../../shared/components/modalform/dynamic-modalform';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
  standalone: true,
    imports: [
      COMMON_IMPORTS,
      TablaDinamicaComponent
    ]
})
export class ProveedoresComponent implements OnInit {

  grid = new ConfigTablaProveedores();
  form = new ConfigFormProveedor();
  estadoGrid = true;
  idSeleccionado: string = '';

  constructor(private readonly proveedorService: ProveedoreService,
    private readonly modalFormService: ModalFormService,
    private readonly mensaje: MensajeAlertService)
  { }

  ngOnInit() {
    this.cargarDatos();
  }

  onFiltrar(){}

  cargarDatos(page = 0, size = 5, sort = 'fechaRegistro,desc'){
    const parms = { esPaginado: true, pagina: page, items: size, estado: this.estadoGrid, sort };

    this.proveedorService.getPagination(parms).subscribe(response => {
      if(response){
        this.grid.cargarDatos(response.data);
        this.grid.setPagination(response.pagina, response.items, response.total);
        this.grid.recargar();
      }
    });
  }

  handleActionEvent(event: ActionEvent): void {

    if (event.action === AccionFormat.eliminar) {
      this.eliminarProveedor(event.rowData.id);
    }
    if (event.action === AccionFormat.editar) {
      this.idSeleccionado = event.rowData.id;
      this.form.data = event.rowData;
      this.onAgregar();
    }

  }

  handlePageEvent(event: PageEvent): void {
    this.cargarDatos(event.pageIndex, event.pageSize);
  }

  handleSortEvent(event: Sort): void {
    const sort = `${event.active},${event.direction}`;
    const size = this.grid.options.pagination.pageSize;
    const page = this.grid.options.pagination.page;
    this.cargarDatos(page, size, sort);
  }

  onAgregar(){
      this.modalFormService.openFormModal(this.form).subscribe(result => {
        if(result && result.action === TipoAccion.save){
          if(this.idSeleccionado){
            this.actualizarProducto(result.data);
            this.idSeleccionado = '';
          } else {
            this.guardarProducto(result.data);
          }
        }

        if(result && result.action === TipoAccion.cancel){
          this.idSeleccionado = '';
          this.form.data = null;
        }

      });
  }

  private guardarProducto(data: any): void {
    this.proveedorService.postSave(data).subscribe(response => {
      if(response){
        this.mensaje.showSuccess("Proveedor guardado correctamente");
        this.cargarDatos();
      } else {
        console.error('Error al guardar el Proveedor');
      }
    });
  }

  private eliminarProveedor(id: string): void {

    this.mensaje.showConfirm('¿Está seguro de eliminar el Proveedor?').subscribe( confirm => {
      if(confirm){
        this.proveedorService.deleteById(id).subscribe(response => {
          if(response){
            this.mensaje.showSuccess(response);
            this.cargarDatos();
          } else {
            console.error('Error al eliminar el Proveedor');
          }
        });
      }
    });

  }

  private actualizarProducto(data: any): void {
    this.proveedorService.putSave(this.idSeleccionado, data).subscribe(response => {
      if(response){
        this.mensaje.showSuccess("Proveedor actualizado correctamente");
        this.cargarDatos();
      } else {
        console.error('Error al guardar el Proveedor');
      }
    });
  }
}
