import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ConfigTabla } from './config-tabla';
import { ActionEvent } from './dynamic-table.models';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule
  ]
})
export class TablaDinamicaComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() gridConfig!: ConfigTabla;

  @Output() action: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = [];

  constructor(private cdRef: ChangeDetectorRef) { }

  // 🔹 Inicialización de columnas y datasource
  ngOnInit(): void {
    if (!this.gridConfig) return;
    this.displayedColumns = [...this.gridConfig.columns.map(c => c.id)];
    this.dataSource.data = this.gridConfig.data ?? [];

    // 👉 Exponer referencia pública al componente
    this.gridConfig.component = this;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    if (this.gridConfig.options?.pagination) {
      this.syncPaginatorValues();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gridConfig'] && this.gridConfig) {
      this.dataSource.data = this.gridConfig.data ?? [];
      this.syncPaginatorValues();
    }
  }

    // 🔹 Sincroniza los valores de paginación
  private syncPaginatorValues(): void {
    if (!this.paginator || !this.gridConfig.options?.pagination) return;

    const { totalItems = 0, pageSize = 5, pageSizeOptions = [5, 10, 20] } = this.gridConfig.options.pagination;
    this.paginator.length = totalItems;
    this.paginator.pageSize = pageSize;
    this.paginator.pageSizeOptions = pageSizeOptions;
    this.cdRef.detectChanges();
  }

  onActionClick(action: string, rowData: any): void {
    this.action.emit({ action, rowData });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onVirtualPage(event: PageEvent): void {
    // Simplemente recalcula los datos locales (sin emitir evento)
    this.paginator.pageIndex = event.pageIndex;
    const total = this.gridConfig.options.pagination.totalItems;
    const startIndex = this.paginator.pageIndex * this.gridConfig.options.pagination.pageSize;
    const endIndex = startIndex + this.gridConfig.options.pagination.pageSize;
    if(this.gridConfig.data){
      this.dataSource.data = this.gridConfig.data.slice(startIndex, endIndex);
    }
  }


  // ============================================================
  // 🔸 MÉTODOS PÚBLICOS ACCESIBLES DESDE gridConfig.component
  // ============================================================

  /** Limpia el filtro y reinicia la paginación */
  public limpiar(): void {
    this.dataSource.filter = '';
    if (this.paginator) this.paginator.firstPage();
  }

  /** Actualiza los datos del grid */
  public actualizarDatos(nuevaData: any[]): void {
    this.dataSource.data = nuevaData;
    this.gridConfig.data = nuevaData;
  }

  /** Refresca completamente la vista del grid */
  public recargar(): void {
    this.dataSource._updateChangeSubscription();
    this.cdRef.detectChanges();
  }

}
