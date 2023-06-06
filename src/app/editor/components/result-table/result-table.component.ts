import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableData } from '../../models/table.model';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent implements OnChanges {
  @Input() public data?: string;

  public items?: TableData;

  public cols?: string[];

  public ngOnChanges(changes: SimpleChanges): void {
    const { data: dataChange } = changes;

    if (typeof dataChange.currentValue === 'string' && dataChange.currentValue !== dataChange.previousValue) {
      this.handleDataChange(dataChange.currentValue);
    }
  }

  private handleDataChange(value: string): void {
    const parsedValue = ResultTableComponent.parseValue(value);

    if (parsedValue !== null) {
      this.items = parsedValue;
      this.setCols(parsedValue);
    }
  }

  private setCols(parsedValue: TableData): void {
    this.cols = [...new Set(parsedValue.map(Object.keys).flat())];
  }

  private static parseValue(value: string): TableData | null {
    try {
      const data = JSON.parse(value) as object;

      if (!Array.isArray(data) || data.some((el) => el instanceof Object !== true)) {
        throw new TypeError('Expected an array of objects');
      }

      return data as TableData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
