import { Pipe, PipeTransform } from '@angular/core';
import { Util } from '../../util';
import { DataType } from '../types/dataFormat.type';
import { TableItems } from '../types/table.type';

@Pipe({
  name: 'items',
})
export class ItemsPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  public transform(value: string | undefined, dataType: DataType = 'json'): TableItems | undefined {
    if (value != null) {
      switch (dataType) {
        case 'json': {
          const parsedValue = Util.parseJson(value);

          if (parsedValue != null) {
            return parsedValue;
          }

          break;
        }
        case 'csv': {
          const parsedValue = Util.parseCsv(value);

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
