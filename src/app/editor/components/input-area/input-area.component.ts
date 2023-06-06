import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
})
export class InputAreaComponent {
  private _data = '[{"name":"Name 1","year":"2010"},{"name":"Name 2","year":"1997"},{"name":"Name 3","year":"2004"}]';

  public get data(): string {
    return this._data;
  }

  @Input() public set data(value: string | undefined) {
    if (value != null && value !== this._data) {
      this._data = value;
    }
  }

  @Output() public dataChange = new EventEmitter<string>();

  public onSubmit(): void {
    this.dataChange.emit(this.data);
  }
}
