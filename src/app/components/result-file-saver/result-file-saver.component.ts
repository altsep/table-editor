import { Component, Input } from '@angular/core';
import * as FileSaver from 'file-saver-es';
import { DataType } from '../../types/dataFormat.type';
import { TableItem } from '../../types/table.type';
import { Util } from '../../util';

@Component({
  selector: 'app-result-file-saver',
  templateUrl: './result-file-saver.component.html',
  styleUrls: ['./result-file-saver.component.scss'],
})
export class ResultFileSaverComponent {
  @Input() public disabled!: boolean;

  @Input() public items: TableItem[] = [];

  @Input() public dataType!: DataType;

  public onSaveAsFile(): void {
    if (this.items != null && this.dataType != null) {
      const mimeType = this.determineMimeType();
      const mutatedData = Util.toDataString(this.items, this.dataType);
      const blob = new Blob([mutatedData], { type: `${mimeType};charset=utf-8` });
      FileSaver.saveAs(blob, `Untitled.${this.dataType}`);
    }
  }

  private determineMimeType(): string {
    if (this.dataType === 'json') {
      return 'application/json';
    }

    if (this.dataType === 'csv') {
      return 'text/csv';
    }

    return 'text/plain';
  }
}
