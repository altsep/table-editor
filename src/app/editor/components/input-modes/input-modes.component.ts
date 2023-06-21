import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DATA_FORMATS, STORAGE_KEY_PREFIX } from '../../../constants';
import { DataType } from '../../types/dataFormat.type';

@Component({
  selector: 'app-input-modes',
  templateUrl: './input-modes.component.html',
  styleUrls: ['./input-modes.component.scss'],
})
export class InputModesComponent {
  public modes = DATA_FORMATS;

  @Input() public dataType!: DataType;

  @Output() public dataTypeChange = new EventEmitter<DataType>();

  public onClick(mode: DataType): void {
    this.dataTypeChange.emit(mode);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}-mode`, mode);
  }
}
