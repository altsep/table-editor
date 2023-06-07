import { Injectable } from '@angular/core';
import { TableItems } from '../models/table.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public static isArrayOfObjects(value: unknown): boolean {
    return Array.isArray(value) && value.every((el) => el instanceof Object);
  }

  public static parseJson(value: string): TableItems | null {
    try {
      const data = JSON.parse(value) as object;
      return data as TableItems;
    } catch (error) {
      return null;
    }
  }

  public static parseCsv(value: string): TableItems | null {
    const lineBreakRegex = /[\r\n]+/;
    const valuesRegex = /(?:"([^"]*(?:""[^"]*)*)")|([^",]+)/g;
    const items: TableItems = [];

    const matrix = value
      .split(lineBreakRegex)
      .filter(Boolean)
      .map((line) => {
        const match = line.match(valuesRegex) || [];
        return match;
      });

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
}
