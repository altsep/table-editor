/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { TableData } from '../models/table.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public isArrayOfObjects(value: unknown): boolean {
    return Array.isArray(value) && value.every((el) => el instanceof Object);
  }

  public parseEditorInputValue(value: string): TableData | null {
    try {
      const data = JSON.parse(value) as object;

      if (!this.isArrayOfObjects(data)) {
        throw new TypeError('Expected an array of objects');
      }

      return data as TableData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
