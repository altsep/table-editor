import { Component } from '@angular/core';
import { STORAGE_KEY_PREFIX, DATA_FORMATS } from './constants';
import { DataType } from './types/dataFormat.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public data = '';

  public dataType: DataType = <DataType | null>localStorage.getItem(`${STORAGE_KEY_PREFIX}-mode`) || DATA_FORMATS[0];
}
