import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ConfigFormModal } from './config-form-modal.model';
import { ActionModalEvent, FormFieldConfig, TipoAccion } from './dynamic-modalform';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NumberFormatDirective } from '../../directives/number-format.directive';
import { ContainerDirective } from '../../directives/app-continer.directive';


@Component({
  selector: 'app-modalform',
  standalone: true,
  templateUrl: './modalform.component.html',
  styleUrls: ['./modalform.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NumberFormatDirective
  ]
})
export class ModalformComponent implements OnInit {

  form!: FormGroup;
  rows: FormFieldConfig[][] = [];

  constructor(
    private dialogRef: MatDialogRef<ModalformComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public gridConfig: ConfigFormModal
  ) {}

  ngOnInit() {
    const group: any = {};

    this.gridConfig.fields.forEach(field => {
      group[field.id] = [
        field.value ?? (this.gridConfig.data ? this.gridConfig.data[field.id] : ''),
        field.validators ?? []
      ];
    });

    this.form = this.fb.group(group);
    // Agrupar campos por fila
    this.buildRows();

  }

  private buildRows(): void {
    const fields = [...this.gridConfig.fields];

    // Asignar fila 1 por defecto si no está definida
    fields.forEach(f => f.row = f.row ?? 1);

    // Obtener todas las filas distintas ordenadas
    const distinctRows = Array.from(new Set(fields.map(f => f.row as number))).sort((a, b) => a - b);

    this.rows = distinctRows.map(rowNumber => {
      return fields
        .filter(f => f.row === rowNumber)
        .sort((a, b) => (a.order ?? 1) - (b.order ?? 1));
    });
  }

  onActionClick(action: TipoAccion): void {

    if (action === TipoAccion.save && this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: ActionModalEvent = {
      action,
      data: this.form.value
    };

    this.dialogRef.close(payload);
  }

  close(): void {
    this.dialogRef.close(null);
  }
}
