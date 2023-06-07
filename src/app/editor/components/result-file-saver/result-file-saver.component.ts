import { Component, Input } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-result-file-saver',
  templateUrl: './result-file-saver.component.html',
  styleUrls: ['./result-file-saver.component.scss'],
})
export class ResultFileSaverComponent {
  @Input() public disabled!: boolean;

  @Input() public data?: string;

  constructor(private fileSaverService: FileSaverService, private dataService: DataService) {}

  private static determineMimeType(dataType: string): string {
    if (dataType === 'json') {
      return 'application/json';
    }

    if (dataType === 'csv') {
      return 'text/csv';
    }

    return 'text/plain';
  }

  public onSaveAsFile(): void {
    if (this.data != null) {
      const dataType = this.dataService.getDataType();
      const mimeType = ResultFileSaverComponent.determineMimeType(dataType);
      const blob = new Blob([this.data], { type: `${mimeType};charset=utf-8` });
      this.fileSaverService.save(blob, `Untitled.${dataType}`);
    }
  }
}
