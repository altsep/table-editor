import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DATA_FORMATS, STORAGE_KEY_PREFIX } from '../../constants';
import { DataFormat } from '../models/dataFormat.model';

@Injectable({
  providedIn: 'root',
})
export class DataModeService {
  public readonly modes = DATA_FORMATS;

  private storageKey = `${STORAGE_KEY_PREFIX}-mode`;

  public currentMode$ = new BehaviorSubject<DataFormat>(
    <DataFormat | null>localStorage.getItem(this.storageKey) || this.modes[0]
  );
}
