import { Component, effect, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { isEqual } from 'lodash-es';
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
  public items = signal<TableItems>([], { equal: isEqual });

  public dataType = toSignal(this.dataService.dataType$);

  public mutatedData?: string;

  constructor(private dataService: DataService, itemsPipe: ItemsPipe, private csvPipe: CsvPipe) {
    effect(() => this.setMutatedData());

    dataService.data$
      .pipe(
        takeUntilDestroyed(),
        map((value) => itemsPipe.transform(value, this.dataType()) || [])
      )
      .subscribe((items) => this.items.set(items));
  }

  public onItemsChange(e: TableItems): void {
    this.items.mutate(() => e);
  }

  public unload(): void {
    if (this.mutatedData != null) {
      this.dataService.data$.next(this.mutatedData);
    }
  }

  public setMutatedData(): void {
    const dataType = this.dataType();
    const items = this.items();

    if (items != null) {
      switch (dataType) {
        case 'json':
          this.mutatedData = JSON.stringify(items);
          break;
        case 'csv':
          this.mutatedData = this.csvPipe.transform(items);
          break;
        default:
      }
    }
  }
}
