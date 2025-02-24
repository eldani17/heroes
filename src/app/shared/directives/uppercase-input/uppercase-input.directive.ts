import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uppercaseInput]',
  standalone: true,
})
export class UppercaseInputDirective {
  private readonly control = inject(NgControl, { optional: true });

  @HostListener('input', ['$event'])
  handleUppercaseInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length > 0) {
      const uppercaseValue = value.toUpperCase();
      input.value = uppercaseValue;
      if (this.control && this.control.control) {
        this.control.control.setValue(uppercaseValue, { emitEvent: false });
      }
    }
  }
}
