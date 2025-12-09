
import { ConfigTabla } from '../../shared/components/tabla-dinamica/config-tabla';
import {
  AccionFormat,
  ColumnDefinition,
  GridOptions,
  RowConfiguracion } from '../../shared/components/tabla-dinamica/dynamic-table.models';
import { TablaDinamicaComponent } from '../../shared/components/tabla-dinamica/tabla-dinamica.component';

export class ConfigTablaCompra implements ConfigTabla {
  component?: TablaDinamicaComponent | undefined;
  columns: ColumnDefinition[] =
    [
      {
        id: 'nombre',
        title: 'Nombre',
        sortable: true ,
        filter:true,
        format:'text'
      },
      {
        id: 'descripcion',
        title: 'Descripción',
        format: 'text',
        filter: false,
        sortable:false
      },
      {
        id:'sku',
        title:'BARCODE / SKU',
        format:'text',
        filter: false,
        sortable:false
      },
      {
        id: 'fechaModificacion',
        title: 'Fecha de modificacion',
        format: 'date',
        sortable: true,
        filter: false
      },
      {
        id: 'accion',
        title: 'Acciones',
        format: 'accion',
        sortable: false,
        filter: false
      }
    ];
  rowconfig?: RowConfiguracion[] = [
    {
      idColumn:'id',
      tipo: 'icon-btn',
      icon:'delete',
      totooltip:'eliminar',
      color: 'warn',
      activo: true,
      visible:true,
      esAccion: AccionFormat.eliminar
    },
    {
      idColumn:'id',
      tipo: 'icon-btn',
      icon:'edit',
      color: 'primary',
      totooltip:'editar',
      activo: true,
      visible:true,
      esAccion: AccionFormat.editar
    }
  ];
  options: GridOptions = {
      paginationVirtual:false,
      sorting: true,
      filtering: true,
      pagination: {
        page: 0,
        pageSize: 5,
        pageSizeOptions: [5, 10, 20],
        totalItems: 0
      }
  };

  setPagination(page : number, pageSize : number, totalItems: number){
    this.options.pagination.pageSize = pageSize;
    this.options.pagination.page = page;
    this.options.pagination.totalItems = totalItems;
  }

  cargarDatos(data=[]){
    this.component?.actualizarDatos(data);

    if(this.options.paginationVirtual){
      this.options.pagination.totalItems = data.length;
    }

  }

  limpiar(){
    this.component?.limpiar();
  }

  recargar(){
    this.component?.recargar();
  }
}
