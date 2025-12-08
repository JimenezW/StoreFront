import { FormFieldConfig, ModalButtonConfig } from "./dynamic-modalform";

export interface ConfigFormModal {

  title: string;
  fields: FormFieldConfig[];
  buttons: ModalButtonConfig[];
  width?: string;
  height?: string;
  data?: any; // para edición
}
