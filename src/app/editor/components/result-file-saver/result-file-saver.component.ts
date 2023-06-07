import { Component, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  public dataType = this.dataService.getDataType();

  constructor(private fileSaverService: FileSaverService, private dataService: DataService) {
    this.dataService.dataType$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.dataType = data;
    });
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

  public onSaveAsFile(): void {
    if (this.data != null) {
      const mimeType = this.determineMimeType();
      const blob = new Blob([this.data], { type: `${mimeType};charset=utf-8` });
      this.fileSaverService.save(blob, `Untitled.${this.dataType}`);
    }
  }
}
