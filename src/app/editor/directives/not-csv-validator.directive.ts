import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UtilService } from '../services/util.service';

export function notCsvValidator(): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const { value } = control;

    if (value) {
      const parsedValue = UtilService.parseCsv(value);

      if (!parsedValue) {
        return {
          csv: "Couldn't parse data",
        };
      }
    }

    return null;
  };
}
