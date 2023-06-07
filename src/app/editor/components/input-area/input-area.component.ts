import { Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataFormatService } from '../../services/dataFormat.service';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
})
export class InputAreaComponent {
  public currentFormat = this.dataFormatService.currentFormat$.getValue();

  public get data(): string {
    return this._dataModel[this.currentFormat];
  }

  @Input() public set data(value: string | undefined) {
    if (value != null && value !== this._dataModel[this.currentFormat]) {
      this._dataModel[this.currentFormat] = value;
    }
  }

  @Output() public dataChange = new EventEmitter<string>();

  private defaultValue =
    '[{"name":"Name 1","year":"2010"},{"name":"Name 2","year":"1997"},{"name":"Name 3","year":"2004"}]';

  private _dataModel: Record<string, string> = {};

  constructor(private dataFormatService: DataFormatService) {
    this._dataModel[this.currentFormat] = this.defaultValue;
    this.dataFormatService.currentFormat$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.currentFormat = data;
    });
  }

  public onSubmit(): void {
    this.dataChange.emit(this._dataModel[this.currentFormat]);
  }
}
