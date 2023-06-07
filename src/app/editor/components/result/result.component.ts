import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableData } from '../../models/table.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  public items?: TableData;

  public data?: string;

  constructor(private dataService: DataService) {
    dataService.data$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.data = data;
    });
  }

  public unload(): void {
    if (this.data != null) {
      this.dataService.data$.next(this.data);
    }
  }
}
