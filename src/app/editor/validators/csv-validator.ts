import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Util } from '../../util';

export function csvValidator(): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const { value } = control;

    if (value) {
      const parsedValue = Util.parseCsv(value);

      if (!parsedValue) {
        return {
          csv: 'Must be valid CSV',
        };
      }
    }

    return null;
  };
}
