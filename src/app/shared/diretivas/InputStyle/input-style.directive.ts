import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInputStyle]',
  standalone: true
})
export class InputStyleDirective {
  constructor(private element: ElementRef) {
    this.element.nativeElement.classList.add('custom-input');
  }
}
