import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';
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

  public mutatedData?: string;

  constructor(private dataService: DataService, itemsPipe: ItemsPipe, private csvPipe: CsvPipe) {
    dataService.dataType$.pipe(takeUntilDestroyed(), skip(1)).subscribe(() => this.setMutatedData());

    dataService.data$.pipe(takeUntilDestroyed()).subscribe((data) => {
      const items = itemsPipe.transform(data);

      if (items != null) {
        this.items = items;
        this.setMutatedData();
      }
    });
  }

  public unload(): void {
    if (this.mutatedData != null) {
      this.dataService.data$.next(this.mutatedData);
    }
  }

  public setMutatedData(): void {
    const dataType = this.dataService.getDataType();

    if (this.items != null) {
      switch (dataType) {
        case 'json':
          this.mutatedData = JSON.stringify(this.items);
          break;
        case 'csv':
          this.mutatedData = this.csvPipe.transform(this.items) || undefined;
          break;
        default:
      }
    }
  }
}
