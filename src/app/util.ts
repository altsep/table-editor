import * as csv from 'csv/browser/esm/sync';
import { isPlainObject } from 'lodash-es';
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
    try {
      const records = csv.parse(value, {
        columns: true,
        skip_empty_lines: true,
      }) as TableItem[];

      if (!records.length) {
        throw new Error();
      }

      return records;
    } catch (error) {
      return null;
    }
  }

  public static getCols(value: TableItem[]): string[] {
    return [...new Set(value.map(Object.keys).flat())];
  }

  public static toCsv(value?: TableItem[] | null): string {
    if (value != null) {
      const stringified = csv.stringify(value, {
        header: true,
      });
      return stringified;
    }

    return '';
  }

  public static toItems(value = '', dataType: DataType = 'json'): TableItem[] {
    const fns = {
      json: Util.parseJson,
      csv: Util.parseCsv,
    };
    const fn = fns[dataType];
    const parsedValue = fn(value);

    if (parsedValue != null) {
      return parsedValue;
    }

    return [];
  }

  public static toDataString(items: TableItem[], dataType: DataType = 'json'): string {
    let data = '';

    if (items != null) {
      switch (dataType) {
        case 'json':
          data = JSON.stringify(items);
          break;
        case 'csv':
          data = Util.toCsv(items);
          break;
        default:
      }
    }

    return data;
  }
}
