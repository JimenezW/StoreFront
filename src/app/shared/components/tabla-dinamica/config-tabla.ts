
import { ColumnDefinition, GridOptions, RowConfiguracion } from '../tabla-dinamica/dynamic-table.models';
import { TablaDinamicaComponent } from './tabla-dinamica.component';


export interface ConfigTabla {

  /** Referencia al componente dinámico (asignada automáticamente por el propio componente) */
  component?: TablaDinamicaComponent;

  /** Datos que se mostrarán en el grid */
  data?: any[];

  /** Definición de columnas del grid */
  columns: ColumnDefinition[];

  rowconfig?: RowConfiguracion[];

  /** Opciones generales del grid (paginación, filtros, ordenamiento, etc.) */
  options: GridOptions;

}
