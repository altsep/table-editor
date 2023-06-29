import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataType } from '../../types/dataFormat.type';
import { TableItem } from '../../types/table.type';
import { Util } from '../../util';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  public items: TableItem[] = [];

  @Input() public dataType!: DataType;

  @Input() public set data(value: string) {
    this.items = Util.toItems(value, this.dataType);
  }

  @Output() public dataChange = new EventEmitter<string>();

  public unload(): void {
    const mutatedData = Util.toDataString(this.items, this.dataType);
    this.dataChange.emit(mutatedData);
  }
}
