import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from 'lodash-es';
import { TableItems } from '../types/table.type';

@Pipe({
  name: 'csv',
})
export class CsvPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  public transform(value?: TableItems | null): string | undefined {
    if (value != null) {
      const cols = [[...new Set(value.map(Object.keys).flat())].join(',')];

      const rows = value.map((item) =>
        Object.values(item)
          .map((v) => (isObject(v) ? JSON.stringify(v) : v))
          .join(',')
      );

      const csv = cols.concat(rows).join('\n');

      return csv;
    }

    return undefined;
  }
}
