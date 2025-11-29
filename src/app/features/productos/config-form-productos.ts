import { ConfigFormModal } from '../../shared/components/modalform/config-form-modal.model';
import { FormFieldConfig, ModalButtonConfig } from '../../shared/components/modalform/dynamic-modalform';

export class ConfigFormProductos implements ConfigFormModal {
  title = 'Formulario de Productos';
  width = '500px';
  fields: FormFieldConfig[] =[
    { id: 'nombre',
      label: 'Nombre',
      type: 'text'
    },
    { id: 'descricion',
      label: 'Descripción',
      type: 'text'
    },
    { id: 'sku',
      label: 'Cod. Barra',
      type: 'number' }
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
