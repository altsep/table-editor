import { Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataFormatService } from '../../services/dataFormat.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  public currentFormat = this.dataFormatService.currentFormat$.getValue();

  @Input() public data?: string;

  @Output() public dataChange = new EventEmitter<string>();

  private _dataModel: Record<string, string> = {};

  constructor(private dataFormatService: DataFormatService) {
    this.dataFormatService.currentFormat$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.currentFormat = data;
    });
  }

  public onSubmit(): void {
    this.dataChange.emit(this._dataModel[this.currentFormat]);
  }
}
