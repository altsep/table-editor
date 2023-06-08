import { Injectable } from '@angular/core';
import { isPlainObject } from 'lodash-es';
import { TableItems } from '../models/table.type';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public static isArrayOfObjects(value: unknown): boolean {
    return Array.isArray(value) && value.every(isPlainObject);
  }

  public static parseJson(value: string): TableItems | null {
    try {
      const lineBreakRegex = /[\r\n]+/g;
      const noBreaksValue = value.replace(lineBreakRegex, '');
      return JSON.parse(noBreaksValue) as TableItems;
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
}
