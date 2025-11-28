import { ValidatorFn } from '@angular/forms';

export interface FormFieldConfig {
  id: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'date';
  value?: any;
  options?: { value: any; label: string }[]; // para select
  validators?: ValidatorFn[];
}

export interface ModalButtonConfig {
  id: string;
  label: string;
  color?: 'primary' | 'accent' | 'warn';
  action: 'save' | 'cancel' | 'custom';
}

export interface ActionModalEvent {
  action: string;
  data: any;
}
