/**
 * Define el formato de los datos que se mostrarán en una columna.
 */
export type ColumnFormat = 'text' | 'date' | 'currency' | 'accion';
export type AccionFormat = 'editar' | 'eliminar' | 'consulta' | 'descarga' | 'click';

export const AccionFormat = {
  editar: 'editar',
  eliminar: 'eliminar',
  consulta: 'consulta',
  descarga: 'descarga',
  click: 'click'
} as const;

/**
 * Define la estructura de una columna en la tabla dinámica.
 */
export interface ColumnDefinition {
  /** El identificador único de la columna, que debe coincidir con una propiedad del objeto de datos. */
  id: string;
  /** El título que se mostrará en la cabecera de la columna. */
  title: string;
  /** El formato en el que se deben mostrar los datos (opcional, por defecto 'text'). */
  format: ColumnFormat;
  /** Indica si la columna se puede ordenar (opcional, por defecto false). */
  sortable: boolean;
  filter : boolean;
}

/**
 * Define las opciones de configuración para la tabla dinámica.
 */
export interface GridOptions {
  paginationVirtual : boolean;
  /** Configuración de la paginación (opcional). */
  pagination: {
    page : number;
    pageSize: number;
    pageSizeOptions: number[];
    totalItems?: number;
  };
  /** Habilita el ordenamiento en las columnas marcadas como 'sortable' (opcional, por defecto false). */
  sorting?: boolean;
  /** Habilita el filtrado (opcional, por defecto false). */
  filtering?: boolean;
}

/**
 * Define la estructura del evento emitido para acciones en una fila.
 */
export interface ActionEvent {
  /** El tipo de acción a realizar ('edit' o 'delete'). */
  action: string;
  /** Los datos de la fila sobre la que se realizó la acción. */
  rowData: any;
}

/**
 * Define la estructura del evento emitido para acciones en una fila.
 */
export interface RowConfiguracion {
  idColumn: string;
  esAccion: AccionFormat;
  tipo : 'link' | 'btn' | 'icon-btn' | 'fecha' | 'texto' | 'numero' | 'moneda';
  icon?: string;
  color?: 'primary' | 'warn'
  totooltip?: string;
  activo: boolean;
  visible: boolean;
  linkValue?: string
}
