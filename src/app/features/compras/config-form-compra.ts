import { Validators } from '@angular/forms';
import { ConfigFormModal } from '../../shared/components/modalform/config-form-modal.model';
import { FormFieldConfig, ModalButtonConfig } from '../../shared/components/modalform/dynamic-modalform';

export class ConfigFormCompra implements ConfigFormModal {
  title = 'Formulario de compras';
  width = '600px';
  height= '300px';
  data?: any;
  fields: FormFieldConfig[] =[
    { id: 'idProveerdor',
      label: 'Proveedor',
      type: 'select',
      row: 1,
      order: 1,
      validators: [
        Validators.required
      ],
      options:[]
    },
    { id: 'idProducto',
      label: 'Producto',
      type: 'select',
      row: 1,
      order: 2,
      validators: [
        Validators.required
      ],
      options: []
    },
    { id: 'cantidad',
      label: 'cantidad',
      type: 'number',
      row: 2,
      order: 1,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5)
      ]
    },
    { id: 'precio',
      label: 'Precio Unitario',
      type: 'currency',
      row: 2,
      order: 2,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(5)
      ]
    }
    ];
  buttons: ModalButtonConfig[] = [
    {
      id: 'btn-guardar',
      label: 'Guardar',
      action: 'save',
      color: 'primary'
    },
    {
      id: 'btn-cancelar',
      label: 'Cancelar',
      action: 'cancel',
      color: 'warn'
    }
  ];

  // =====================================================
  // 🔹 MÉTODOS PARA CARGA DE SELECTS
  // =====================================================

  setProveedores(options: []): void {
    this.setSelectOptions('idProveerdor', options);
  }

  setProductos(options: []): void {
    this.setSelectOptions('idProducto', options);
  }

  // =====================================================
  // 🔹 MÉTODO GENÉRICO PRIVADO
  // =====================================================
  private setSelectOptions(fieldId: string, options: []): void {
    const field = this.fields.find(f => f.id === fieldId && f.type === 'select');
    if (field) {
      field.options = options;
    }
  }
}
