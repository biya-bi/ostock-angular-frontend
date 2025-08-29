import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Directive({
  selector: '[validationTrigger]',
  standalone: false,
})
export class ValidationTriggerDirective {
  @Input() validationControl: ParentControl;

  @HostListener('click', ['$event'])
  handleClickEvent() {
    this.markAsTouched(this.validationControl);
  }

  private markAsTouched(control: AbstractControl): void {
    control.markAsTouched();
    control.updateValueAndValidity();
    if (this.isParentControl(control)) {
      Object.values(control.controls).forEach((childControl) =>
        this.markAsTouched(childControl),
      );
    }
  }

  private isParentControl(control: AbstractControl): control is ParentControl {
    return control instanceof FormGroup || control instanceof FormArray;
  }
}

type ParentControl = FormGroup | FormArray;
