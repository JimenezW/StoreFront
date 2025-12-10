import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective implements OnInit {

  /** Default prefix and mask */
  @Input('appPhoneMask') prefix = '+52';
  @Input() mask = ' (###) ###-####'; // use '#' as digit placeholder
  @Input() placeholderChar = '_';

  private template = '';           // full visible template e.g. "+52 (___) ___-____"
  private digitPositions: number[] = []; // indices in template where digits go
  private maxDigits = 0;

  constructor(
    private elRef: ElementRef<HTMLInputElement>,
    private renderer: Renderer2,
    private ngControl: NgControl | null
  ) {}

  ngOnInit(): void {
    this.buildTemplate();
    // initialize visible value
    this.setInputValue(this.template);
    // initialize control value (prefix only)
    this.updateControlValue('');
  }

  private buildTemplate() {
    const prefixChars = this.prefix.split('');
    const maskChars = this.mask.split('');
    const out: string[] = [];

    // put prefix first
    for (const c of prefixChars) out.push(c);
    // now mask
    let pos = out.length;
    for (const ch of maskChars) {
      if (ch === '#') {
        out.push(this.placeholderChar);
        this.digitPositions.push(pos);
      } else {
        out.push(ch);
      }
      pos++;
    }

    this.template = out.join('');
    this.maxDigits = this.digitPositions.length;
  }

  private get inputEl(): HTMLInputElement {
    return this.elRef.nativeElement;
  }

  private setInputValue(val: string) {
    this.renderer.setProperty(this.inputEl, 'value', val);
  }

  private updateControlValue(digitsOnly: string) {
    const real = `${this.prefix}${digitsOnly}`;
    if (this.ngControl?.control) {
      this.ngControl.control.setValue(real, { emitEvent: false, onlySelf: true });
    } else {
      // fallback: store as data-value attribute
      this.renderer.setAttribute(this.inputEl, 'data-value', real);
    }
  }

  private getDigitsArrayFromView(): string[] {
    const v = this.inputEl.value ?? this.template;
    const arr: string[] = new Array(this.maxDigits).fill('');
    for (let i = 0; i < this.maxDigits; i++) {
      const ch = v[this.digitPositions[i]];
      arr[i] = ch && /\d/.test(ch) ? ch : '';
    }
    return arr;
  }

  private buildViewFromDigits(arr: string[]): string {
    const chars = this.template.split('');
    for (let i = 0; i < this.maxDigits; i++) {
      const pos = this.digitPositions[i];
      chars[pos] = arr[i] ? arr[i] : this.placeholderChar;
    }
    return chars.join('');
  }

  private setCaret(pos: number) {
    try {
      this.inputEl.setSelectionRange(pos, pos);
    } catch {}
  }

  private firstEmptyIndex(fromIndex = 0): number {
    const arr = this.getDigitsArrayFromView();
    for (let i = fromIndex; i < arr.length; i++) {
      if (!arr[i]) return i;
    }
    return -1;
  }

  /* ----------------- Events ----------------- */

  @HostListener('focus')
  onFocus() {
    // move caret to first empty digit placeholder
    const idx = this.firstEmptyIndex();
    const pos = idx === -1 ? (this.digitPositions[this.digitPositions.length - 1] + 1) : this.digitPositions[idx];
    this.setCaret(pos);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    const key = e.key;

    // Allow navigation keys
    if (
      key === 'ArrowLeft' ||
      key === 'ArrowRight' ||
      key === 'Home' ||
      key === 'End' ||
      key === 'Tab'
    ) {
      return;
    }

    // Allow select-all / copy / paste ctrl combinations
    if (e.ctrlKey || e.metaKey) {
      return;
    }

    // handle Backspace / Delete
    if (key === 'Backspace' || key === 'Delete') {
      e.preventDefault();
      this.handleDelete(key === 'Backspace');
      return;
    }

    // only allow digits
    if (/^\d$/.test(key)) {
      e.preventDefault();
      this.handleDigitInput(key);
      return;
    }

    // otherwise prevent input
    e.preventDefault();
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData?.getData('text') ?? '';
    const digits = (text.match(/\d/g) || []).join('').slice(0, this.maxDigits);
    if (!digits) return;
    this.handlePaste(digits);
  }

  /* ----------------- Handlers ----------------- */

  private handleDigitInput(digit: string) {
    const caret = this.inputEl.selectionStart ?? 0;
    // find the index of the digit position >= caret
    let idx = this.digitPositions.findIndex(p => p >= caret);
    if (idx === -1) {
      // caret after last digit -> append at first empty or last
      idx = this.firstEmptyIndex();
      if (idx === -1) idx = this.maxDigits - 1;
    }

    // if caret is exactly at a static char, ensure we pick correct slot (first empty at/after idx)
    const digitsArr = this.getDigitsArrayFromView();
    let insertAt = idx;
    // if current slot occupied, find next empty
    while (insertAt < digitsArr.length && digitsArr[insertAt]) insertAt++;
    if (insertAt >= digitsArr.length) {
      // all filled -> replace last
      insertAt = digitsArr.length - 1;
    }
    digitsArr[insertAt] = digit;

    const view = this.buildViewFromDigits(digitsArr);
    this.setInputValue(view);

    // update control
    const clean = digitsArr.join('');
    this.updateControlValue(clean);

    // place caret after the inserted slot (at next placeholder position or after last)
    const nextIdx = insertAt + 1;
    const caretPos = nextIdx < this.digitPositions.length ? this.digitPositions[nextIdx] : (this.digitPositions[this.digitPositions.length - 1] + 1);
    this.setCaret(caretPos);
  }

  private handleDelete(isBackspace: boolean) {
    const caret = this.inputEl.selectionStart ?? 0;
    const digitsArr = this.getDigitsArrayFromView();

    if (isBackspace) {
      // find last digit position strictly before caret
      let idx = -1;
      for (let i = this.digitPositions.length - 1; i >= 0; i--) {
        if (this.digitPositions[i] < caret) {
          idx = i;
          break;
        }
      }
      if (idx >= 0) {
        digitsArr[idx] = '';
        const view = this.buildViewFromDigits(digitsArr);
        this.setInputValue(view);
        this.updateControlValue(digitsArr.join(''));
        this.setCaret(this.digitPositions[idx]);
      }
      return;
    }

    // Delete key: remove digit at/after caret (first digit position >= caret)
    let idxAt = this.digitPositions.findIndex(p => p >= caret);
    if (idxAt === -1) idxAt = this.digitPositions.length - 1;
    digitsArr[idxAt] = '';
    const view = this.buildViewFromDigits(digitsArr);
    this.setInputValue(view);
    this.updateControlValue(digitsArr.join(''));
    this.setCaret(this.digitPositions[idxAt]);
  }

  private handlePaste(digits: string) {
    // fill left-to-right
    const arr = this.getDigitsArrayFromView();
    const incoming = digits.split('');
    for (let i = 0; i < this.maxDigits; i++) {
      arr[i] = incoming[i] ?? arr[i] ?? '';
    }
    const view = this.buildViewFromDigits(arr);
    this.setInputValue(view);
    this.updateControlValue(arr.join(''));
    // caret to first empty
    const firstEmpty = this.firstEmptyIndex();
    const pos = firstEmpty === -1 ? (this.digitPositions[this.digitPositions.length - 1] + 1) : this.digitPositions[firstEmpty];
    this.setCaret(pos);
  }
}
