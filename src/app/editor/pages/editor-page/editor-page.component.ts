import { Component } from '@angular/core';
import { DATA_FORMATS, STORAGE_KEY_PREFIX } from '../../../constants';
import { DataType } from '../../types/dataFormat.type';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
})
export class EditorPageComponent {
  public data = '';

  public dataType: DataType = <DataType | null>localStorage.getItem(`${STORAGE_KEY_PREFIX}-mode`) || DATA_FORMATS[0];
}
