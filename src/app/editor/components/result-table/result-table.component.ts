import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TableData } from '../../models/table.model';
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
export class ResultTableComponent implements OnChanges {
  public cols: Col[] = [];

  @Input() public items: TableData = [];

  @Output() public itemsChange = new EventEmitter<string>();

  constructor(public utilService: UtilService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const { items: itemsChange } = changes;

    if (itemsChange.currentValue != null) {
      const currentValue = itemsChange.currentValue as TableData;
      this.setCols(currentValue);
    }
  }

  public emitData(): void {
    const mutatedData = JSON.stringify(this.items);
    this.itemsChange.emit(mutatedData);
  }

  public sort({ name, sortType }: Col, i: number): void {
    this.cols = this.cols.map((el) => ({ ...el, sortType: undefined }));

    if (sortType === 'asc') {
      this.items = this.items.sort((a, b) => (String(a[name]) > String(b[name]) ? -1 : 1));
      this.cols[i].sortType = 'desc';
    } else {
      this.items = this.items.sort((a, b) => (String(a[name]) > String(b[name]) ? 1 : -1));
      this.cols[i].sortType = 'asc';
    }
  }

  private setCols(items: TableData): void {
    this.cols = [...new Set(items.map(Object.keys).flat())].map((name) => ({ name, sortType: undefined }));
  }
}
