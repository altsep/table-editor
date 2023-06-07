import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UtilService } from '../services/util.service';

export function csvValidator(): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const { value } = control;

    if (value) {
      const parsedValue = UtilService.parseCsv(value);

      if (!parsedValue) {
        return {
          csv: 'Must be valid CSV',
        };
      }
    }

    return null;
  };
}
