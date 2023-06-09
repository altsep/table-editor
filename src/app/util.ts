import { isObject, isPlainObject } from 'lodash-es';
import { DataType } from './editor/types/dataFormat.type';
import { TableItems } from './editor/types/table.type';

export class Util {
  public static isArrayOfObjects(value: unknown): boolean {
    return Array.isArray(value) && value.every(isPlainObject);
  }

  public static parseJson(value: string): TableItems | null {
    try {
      const lineBreakRegex = /[\r\n]+/g;
      const noLineBreaksValue = value.replace(lineBreakRegex, '');
      return JSON.parse(noLineBreaksValue) as TableItems;
    } catch (error) {
      return null;
    }
  }

  public static parseCsv(value: string): TableItems | null {
    const lineBreakRegex = /[\r\n]+/;
    const valuesRegex = /(?!\B{[^}]*|"),(?![^{]*}\B|")/g;
    const items: TableItems = [];

    const matrix = value
      .split(lineBreakRegex)
      .filter(Boolean)
      .map((line) => line.split(valuesRegex));

    const csvCols = matrix.splice(0, 1)[0];

    matrix.forEach((row) => {
      const item: Record<string, string> = {};

      row.forEach((v, j) => {
        if (j < csvCols.length) {
          item[csvCols[j]] = v;
        }
      });

      items.push(item);
    });

    if (items.length) {
      return items;
    }

    return null;
  }

  public static toCsv(value?: TableItems | null): string | undefined {
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

  public static toItems(value: string | undefined, dataType: DataType = 'json'): TableItems | undefined {
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
