import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UtilService } from '../services/util.service';

export function notJsonValidator(): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const { value } = control;

    if (value) {
      const parsedValue = UtilService.parseJson(value);

      if (!parsedValue) {
        return {
          json: "Couldn't parse value",
        };
      }

      const isArrayOfObjects = UtilService.isArrayOfObjects(parsedValue);

      if (!isArrayOfObjects) {
        return {
          json: 'Value must be an array of objects',
        };
      }
    }

    return null;
  };
}