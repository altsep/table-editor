import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableItems } from '../../models/table.model';
import { CsvPipe } from '../../pipes/csv.pipe';
import { ItemsPipe } from '../../pipes/items.pipe';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  providers: [ItemsPipe, CsvPipe],
})
export class ResultComponent {
  public items?: TableItems;

  public data?: string;

  constructor(private dataService: DataService, itemsPipe: ItemsPipe, private csvPipe: CsvPipe) {
    dataService.data$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.data = data;

      const items = itemsPipe.transform(data);

      if (items != null) {
        this.items = items;
      }
    });
  }

  public unload(): void {
    let mutatedData: string | null = null;
    const dataType = this.dataService.getDataType();

    if (this.items != null) {
      switch (dataType) {
        case 'json':
          mutatedData = JSON.stringify(this.items);
          break;
        case 'csv':
          mutatedData = this.csvPipe.transform(this.items);
          break;
        default:
      }
    }

    if (mutatedData != null) {
      this.dataService.data$.next(mutatedData);
    }
  }
}
