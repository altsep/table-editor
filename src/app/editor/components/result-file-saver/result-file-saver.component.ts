import { Component, Input } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-result-file-saver',
  templateUrl: './result-file-saver.component.html',
  styleUrls: ['./result-file-saver.component.scss'],
})
export class ResultFileSaverComponent {
  @Input() public disabled!: boolean;

  @Input() public data?: string;

  @Input() public dataType?: string;

  constructor(private fileSaverService: FileSaverService) {}

  public onSaveAsFile(): void {
    if (this.data != null && this.dataType != null) {
      const mimeType = this.determineMimeType();
      const blob = new Blob([this.data], { type: `${mimeType};charset=utf-8` });
      this.fileSaverService.save(blob, `Untitled.${this.dataType}`);
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
