import { Validators } from '@angular/forms';
import { ConfigFormModal } from '../../shared/components/modalform/config-form-modal.model';
import { FormFieldConfig, ModalButtonConfig } from '../../shared/components/modalform/dynamic-modalform';

export class ConfigFormProveedor implements ConfigFormModal {
  title = 'Formulario de Proveedor';
  width = '600px';
  height= '400px';
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
    { id: 'telefono',
      label: 'Telefono',
      type: 'telephone',
      row: 2,
      order: 1,
      validators: [
        Validators.required
      ]
    },
    { id: 'contacto',
      label: 'Celular',
      type: 'number',
      row: 2,
      order: 2,
      validators: [
        Validators.minLength(8),
        Validators.maxLength(10)
      ]
    },
    { id: 'email',
      label: 'Correo Electrónico',
      type: 'text',
      row: 3,
      order: 1,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(13)
      ]
    },
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
