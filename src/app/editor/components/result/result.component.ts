import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() public set data(value: string) {
    this.items = Util.toItems(value, this.dataService.getDataType());
  }

  @Output() public dataChange = new EventEmitter<string>();

  constructor(public dataService: DataService) {}

  public unload(): void {
    const dataType = this.dataService.getDataType();
    const mutatedData = Util.toDataString(this.items, dataType);
    this.dataChange.emit(mutatedData);
  }
}
