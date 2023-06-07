import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notCsvValidator(): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const errs = {};
    const value = control.value || '';

    return null;
  };
}
