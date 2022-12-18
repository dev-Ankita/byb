import { AbstractControl } from "@angular/forms";

export function AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value > 35) {
      return { 'experience': true };
    }
    return null;
  }