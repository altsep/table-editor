import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isEqual, isObjectLike } from 'lodash-es';
import { TableItems } from '../../models/table.type';
import { UtilService } from '../../services/util.service';

interface Col {
  name: string;
  sortType?: 'asc' | 'desc';
}

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent {
  public cols: Col[] = [];

  private _items: TableItems = [];

  public get items(): TableItems {
    return this._items;
  }

  @Input() public set items(value: TableItems) {
    if (value != null) {
      this._items = value;
      this.setCols(value);
    }
  }

  @Output() public itemsChange = new EventEmitter<TableItems>();

  constructor(public utilService: UtilService) {}

  public isObjectLike = isObjectLike;

  public sort({ name, sortType }: Col, i: number): void {
    if (sortType === 'asc') {
      this.items = this.items.slice().sort((a, b) => (String(a[name]) > String(b[name]) ? -1 : 1));
      this.cols[i].sortType = 'desc';
    } else {
      this.items = this.items.slice().sort((a, b) => (String(a[name]) > String(b[name]) ? 1 : -1));
      this.cols[i].sortType = 'asc';
    }

    this.itemsChange.emit(this.items);
  }

  private setCols(items: TableItems): void {
    const cols = [...new Set(items.map(Object.keys).flat())];
    const prevCols = this.cols.map(({ name }) => name);

    if (!isEqual(prevCols, cols)) {
      this.cols = cols.map((name) => ({ name, sortType: undefined }));
    }
  }
}
