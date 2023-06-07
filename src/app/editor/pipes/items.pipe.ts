import { Pipe, PipeTransform } from '@angular/core';
import { TableItems } from '../models/table.model';
import { DataService } from '../services/data.service';
import { UtilService } from '../services/util.service';

@Pipe({
  name: 'items',
})
export class ItemsPipe implements PipeTransform {
  constructor(private dataModeService: DataService) {}

  public transform(value?: string | null): TableItems | null {
    if (value != null) {
      const currentMode = this.dataModeService.dataType$.getValue();

      switch (currentMode) {
        case 'json': {
          const parsedValue = UtilService.parseJson(value || '');

          if (parsedValue != null) {
            return parsedValue;
          }

          break;
        }
        case 'csv': {
          const parsedValue = UtilService.parseCsv(value || '');

          if (parsedValue != null) {
            return parsedValue;
          }

          break;
        }
        default:
          return null;
      }
    }

    return null;
  }
}
