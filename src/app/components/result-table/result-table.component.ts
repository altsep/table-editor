import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isObjectLike } from 'lodash-es';
import { TableItem } from '../../types/table.type';
import { Util } from '../../util';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent {
  @Input() public items: TableItem[] = [];

  @Output() public itemsChange = new EventEmitter<TableItem[]>();

  private sortType: 'asc' | 'desc' = 'asc';

  public getCols = Util.getCols;

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
