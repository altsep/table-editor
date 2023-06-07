import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_KEY_PREFIX } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class DataFormatService {
  public readonly formats: readonly string[] = ['json', 'csv'];

  private storageKey = `${STORAGE_KEY_PREFIX}-format`;

  public currentFormat$ = new BehaviorSubject(localStorage.getItem(this.storageKey) || this.formats[0]);
}
