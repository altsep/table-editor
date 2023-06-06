import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableData } from '../../models/table.model';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent {
  private _data?: string;

  public get data(): string | undefined {
    return this._data;
  }

  @Input() public set data(value: string | undefined) {
    if (value != null && value !== this._data) {
      this._data = value;
      this.handleDataChange(value);
    }
  }

  public cols: string[] = [];

  public items: TableData = [];

  @Output() public itemsChange = new EventEmitter<string>();

  public unload(): void {
    const mutatedData = JSON.stringify(this.items);
    this._data = mutatedData;
    this.itemsChange.emit(mutatedData);
  }

  private handleDataChange(value: string): void {
    const parsedValue = ResultTableComponent.parseValue(value);

    if (parsedValue != null) {
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
