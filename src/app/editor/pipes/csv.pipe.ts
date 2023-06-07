import { Pipe, PipeTransform } from '@angular/core';
import { TableItems } from '../models/table.model';

@Pipe({
  name: 'csv',
})
export class CsvPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  public transform(value?: TableItems | null): string | null {
    if (value != null) {
      const cols = [[...new Set(value.map(Object.keys).flat())].join(',')];

      const rows = value.map((item) => Object.values(item).join(','));

      const csv = cols.concat(rows).join('\n');

      return csv;
    }

    return null;
  }
}
