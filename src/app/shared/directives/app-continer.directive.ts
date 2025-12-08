import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appContainer]',
  standalone: true
})
export class ContainerDirective {

  /**
   * Permite personalizar el max-width desde el HTML.
   * Ejemplo: <div appContainer maxWidth="900px"></div>
   */
  @Input() maxWidth: string | null = null;

  @HostBinding('class.app-container')
  baseClass = true;

  @HostBinding('style.max-width')
  get hostMaxWidth() {
    return this.maxWidth;
  }

}
