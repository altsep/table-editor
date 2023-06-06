import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableData } from '../../models/table.model';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
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

  @Input() public items: TableData = [];

  @Output() public dataChange = new EventEmitter<string>();

  constructor(private utilService: UtilService) {}

  public unload(): void {
    const mutatedData = JSON.stringify(this.items);
    this.data = mutatedData;
    this.dataChange.emit(mutatedData);
  }

  private handleDataChange(value: string): void {
    const parsedValue = this.utilService.parseEditorInputValue(value);

    if (parsedValue != null) {
      this.items = parsedValue;
    }
  }
}
