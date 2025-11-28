import { FormFieldConfig, ModalButtonConfig } from "./dynamic-modalform";
import { ModalformComponent } from "./modalform.component";

export interface ConfigFormModal {

  //component?: ModalformComponent;

  title: string;
  fields: FormFieldConfig[];
  buttons: ModalButtonConfig[];
  width?: string;
  data?: any; // para edición
}
