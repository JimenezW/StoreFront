import { Directive, HostListener, Input, ElementRef } from '@angular/core';

/**
 * Directiva para formatear números en campos de entrada.
 * Permite configurar opciones como permitir negativos, decimales,
 * separadores de miles, símbolo de moneda, etc.
 * Ejemplo de uso:
 * <input appNumberFormat
 *    [allowNegative]="true"
 *    [allowDecimal]="true"
 *    [decimalPlaces]="2"
 *    [thousandSeparator]=","
 *    [decimalSeparator]="."
 *    [currencySymbol]="$"
 *    [allowZero]="false" />
 */
@Directive({
  selector: '[appNumberFormat]',
  standalone: true
})
export class NumberFormatDirective {

  @Input() allowNegative = false;
  @Input() allowDecimal = false;
  @Input() decimalPlaces = 0;
  @Input() thousandSeparator: ',' | '.' | '' = '';
  @Input() decimalSeparator: '.' | ',' = '.';
  @Input() currencySymbol?: string;
  @Input() allowZero = true;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let value = this.el.nativeElement.value;

    // Quitar símbolo moneda
    if (this.currencySymbol) {
      value = value.replace(this.currencySymbol, '');
    }

    // Quitar separador de miles
    if (this.thousandSeparator) {
      const ts = this.thousandSeparator === '.' ? '\\.' : ',';
      value = value.replace(new RegExp(ts, 'g'), '');
    }

    // Validar negativos
    if (!this.allowNegative) {
      value = value.replace('-', '');
    }

    // Validar decimales
    if (!this.allowDecimal) {
      value = value.replace(new RegExp(`\\${this.decimalSeparator}.*$`), '');
    }

    // Limitar decimales
    if (this.allowDecimal && this.decimalPlaces > 0) {
      const parts = value.split(this.decimalSeparator);
      if (parts[1]) {
        parts[1] = parts[1].substring(0, this.decimalPlaces);
        value = parts.join(this.decimalSeparator);
      }
    }

    // Validar números
    const regex = new RegExp(`^[0-9${this.allowNegative ? '-' : ''}${this.allowDecimal ? this.decimalSeparator : ''}]*$`);
    if (!regex.test(value)) {
      value = value.replace(/[^0-9\.\,\-]/g, '');
    }

    // Evitar cero si no se permite
    if (!this.allowZero && value === '0') {
      value = '';
    }

    // Aplicar separador de miles
    if (this.thousandSeparator) {
      const [intPart, decPart] = value.split(this.decimalSeparator);
      const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandSeparator);
      value = decPart ? intFormatted + this.decimalSeparator + decPart : intFormatted;
    }

    // Agregar símbolo de moneda
    if (this.currencySymbol) {
      value = `${this.currencySymbol} ${value}`;
    }

    this.el.nativeElement.value = value;
  }
}
