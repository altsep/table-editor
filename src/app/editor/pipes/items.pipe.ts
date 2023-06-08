import { Pipe, PipeTransform } from '@angular/core';
import { DataType } from '../models/dataFormat.model';
import { TableItems } from '../models/table.model';
import { UtilService } from '../services/util.service';

@Pipe({
  name: 'items',
})
export class ItemsPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  public transform(value: string | undefined, dataType: DataType = 'json'): TableItems | undefined {
    if (value != null) {
      switch (dataType) {
        case 'json': {
          const parsedValue = UtilService.parseJson(value);

          if (parsedValue != null) {
            return parsedValue;
          }

          break;
        }
        case 'csv': {
          const parsedValue = UtilService.parseCsv(value);

          if (parsedValue != null) {
            return parsedValue;
          }

          break;
        }
        default:
          return undefined;
      }
    }

    return undefined;
  }
}
