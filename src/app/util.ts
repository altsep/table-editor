import * as csv from 'csv/browser/esm/sync';
import { isObject, isPlainObject } from 'lodash-es';
import { DataType } from './editor/types/dataFormat.type';
import { TableItem } from './editor/types/table.type';

export class Util {
  public static isArrayOfPlainObjects(value: unknown): boolean {
    return Array.isArray(value) && value.every(isPlainObject);
  }

  public static parseJson(value: string): TableItem[] | null {
    try {
      const lineBreakRegex = /[\r\n]+/g;
      const noLineBreaksValue = value.replace(lineBreakRegex, '');
      return JSON.parse(noLineBreaksValue) as TableItem[];
    } catch (error) {
      return null;
    }
  }

  public static parseCsv(value: string): TableItem[] | null {
    const records = csv.parse(value, {
      columns: true,
      skip_empty_lines: true,
    }) as TableItem[];

    if (records.length) {
      return records;
    }

    return null;
  }

  public static getCols(value: TableItem[]): string[] {
    return [...new Set(value.map(Object.keys).flat())];
  }

  public static toCsv(value?: TableItem[] | null): string | undefined {
    if (value != null) {
      const cols = [Util.getCols(value).join(',')];

      const rows = value.map((item) =>
        Object.values(item)
          .map((v) => (isObject(v) ? JSON.stringify(v) : v))
          .join(',')
      );

      const csvString = cols.concat(rows).join('\n');

      return csvString;
    }

    return undefined;
  }

  public static toItems(value: string | undefined, dataType: DataType = 'json'): TableItem[] | undefined {
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
