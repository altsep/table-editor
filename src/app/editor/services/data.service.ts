import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DATA_FORMATS, STORAGE_KEY_PREFIX } from '../../constants';
import { DataType } from '../types/dataFormat.type';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public readonly modes = DATA_FORMATS;

  private readonly storageKey = `${STORAGE_KEY_PREFIX}-mode`;

  public dataType$ = new BehaviorSubject<DataType>(
    <DataType | null>localStorage.getItem(this.storageKey) || this.modes[0]
  );

  public setMode(mode: DataType): void {
    localStorage.setItem(this.storageKey, mode);
    this.dataType$.next(mode);
  }

  public getDataType(): DataType {
    return this.dataType$.getValue();
  }
}
