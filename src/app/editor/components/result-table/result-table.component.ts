import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableItems } from '../../models/table.model';
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

  public sort({ name, sortType }: Col, i: number): void {
    this.cols = this.cols.map((el) => ({ ...el, sortType: undefined }));

    if (sortType === 'asc') {
      this.items = this.items.sort((a, b) => (String(a[name]) > String(b[name]) ? -1 : 1));
      this.cols[i].sortType = 'desc';
    } else {
      this.items = this.items.sort((a, b) => (String(a[name]) > String(b[name]) ? 1 : -1));
      this.cols[i].sortType = 'asc';
    }

    this.itemsChange.emit(this.items);
  }

  private setCols(items: TableItems): void {
    this.cols = [...new Set(items.map(Object.keys).flat())].map((name) => ({ name, sortType: undefined }));
  }
}
