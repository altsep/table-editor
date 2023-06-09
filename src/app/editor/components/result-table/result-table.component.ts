import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isObjectLike } from 'lodash-es';
import { Util } from '../../../util';
import { TableItem } from '../../types/table.type';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent {
  public cols: string[] = [];

  private _items: TableItem[] = [];

  public get items(): TableItem[] {
    return this._items;
  }

  @Input() public set items(value: TableItem[]) {
    if (value != null) {
      this._items = value;
      this.cols = Util.getCols(value);
    }
  }

  @Output() public itemsChange = new EventEmitter<TableItem[]>();

  private sortType: 'asc' | 'desc' = 'asc';

  public isObjectLike = isObjectLike;

  public sortItems(name: string): void {
    if (this.sortType === 'asc') {
      this.items = this.items.slice().sort((a, b) => (String(a[name]) > String(b[name]) ? -1 : 1));
      this.sortType = 'desc';
    } else {
      this.items = this.items.slice().sort((a, b) => (String(a[name]) > String(b[name]) ? 1 : -1));
      this.sortType = 'asc';
    }

    this.itemsChange.emit(this.items);
  }
}
