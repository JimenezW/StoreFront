import { ValidatorFn } from '@angular/forms';

export interface FormFieldConfig {
  id: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'date';
  value?: any;
  row?: number;
  order?: number;
  options?: { value: any; label: string }[]; // para select
  validators?: ValidatorFn[];
}

export interface ModalButtonConfig {
  id: string;
  label: string;
  color?: 'primary' | 'accent' | 'warn';
  action: TipoAccion;
}

export interface ActionModalEvent {
  action: TipoAccion;
  data: any;
}

export type TipoAccion = 'save' | 'cancel' | 'custom';

export const TipoAccion = {
  save: 'save',
  cancel: 'cancel',
  custom: 'custom'
} as const;
