import { Validators } from '@angular/forms';
import { ConfigFormModal } from '../../shared/components/modalform/config-form-modal.model';
import { FormFieldConfig, ModalButtonConfig } from '../../shared/components/modalform/dynamic-modalform';

export class ConfigFormProductos implements ConfigFormModal {
  title = 'Formulario de compras';
  width = '600px';
  height= '300px';
  data?: any;
  fields: FormFieldConfig[] =[
    { id: 'nombre',
      label: 'Nombre',
      type: 'text',
      row: 1,
      order: 1,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]
    },
    { id: 'descripcion',
      label: 'Descripción',
      type: 'text',
      row: 1,
      order: 2,
      validators: [
        Validators.maxLength(100)
      ]
    },
    { id: 'sku',
      label: 'Cod. Barra',
      type: 'number',
      row: 2,
      order: 1,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(13)
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
}
