import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataType } from '../../types/dataFormat.type';
import { jsonValidator } from '../../validators/json-validator';
import { csvValidator } from '../../validators/csv-validator';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  public control = new FormControl('', [Validators.required]);

  public get data(): string {
    return <string>this.control.value;
  }

  @Input() public set data(value: string) {
    this.control.setValue(value);
  }

  private _dataType!: DataType;

  public get dataType(): DataType {
    return this._dataType;
  }

  @Input() public set dataType(value: DataType) {
    this._dataType = value;
    this.updateValidators();
  }

  @Output() public dataChange = new EventEmitter<string>();

  @Output() public dataTypeChange = new EventEmitter<DataType>();

  public load(): void {
    this.dataChange.emit(this.data);
  }

  private updateValidators(): void {
    const customValidators = {
      json: jsonValidator(),
      csv: csvValidator(),
    };
    const inputValidator = customValidators[this.dataType];
    this.control.setValidators([Validators.required, inputValidator]);
    this.control.updateValueAndValidity();
  }
}
