import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DATA_FORMATS, STORAGE_KEY_PREFIX } from '../../constants';
import { DataFormat } from '../models/dataFormat.model';

@Injectable({
  providedIn: 'root',
})
export class DataFormatService {
  public readonly formats = DATA_FORMATS;

  private storageKey = `${STORAGE_KEY_PREFIX}-format`;

  public currentFormat$ = new BehaviorSubject<DataFormat>(
    <DataFormat | null>localStorage.getItem(this.storageKey) || this.formats[0]
  );
}
