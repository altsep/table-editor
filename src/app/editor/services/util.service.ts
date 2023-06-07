import { Injectable } from '@angular/core';
import { TableData } from '../models/table.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public static isArrayOfObjects(value: unknown): boolean {
    return Array.isArray(value) && value.every((el) => el instanceof Object);
  }

  public static parseJson(value: string): TableData | null {
    try {
      const data = JSON.parse(value) as object;
      return data as TableData;
    } catch (error) {
      return null;
    }
  }
}
