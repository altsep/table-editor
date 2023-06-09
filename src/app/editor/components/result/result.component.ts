import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Util } from '../../../util';
import { DataService } from '../../services/data.service';
import { TableItem } from '../../types/table.type';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  public items: TableItem[] = [];

  public dataType$ = this.dataService.dataType$;

  constructor(public dataService: DataService) {
    dataService.inputData$
      .pipe(
        takeUntilDestroyed(),
        map((value) => Util.toItems(value, dataService.getDataType()))
      )
      .subscribe((items) => {
        this.items = items;
      });
  }

  public unload(): void {
    const dataType = this.dataService.getDataType();
    const mutatedData = Util.toDataString(this.items, dataType);
    this.dataService.outputData$.next(mutatedData);
  }
}
