import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataType } from '../../types/dataFormat.type';
import { csvValidator } from '../../validators/csv-validator';
import { jsonValidator } from '../../validators/json-validator';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnChanges {
  public control = new FormControl('', Validators.required);

  public get data(): string {
    return <string>this.control.value;
  }

  @Input() public set data(value: string) {
    this.control.setValue(value);
  }

  @Input() public dataType!: DataType;

  @Output() public dataChange = new EventEmitter<string>();

  @Output() public dataTypeChange = new EventEmitter<DataType>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataType']) {
      this.updateValidators();
    }
  }

  public load(): void {
    this.dataChange.emit(this.data);
  }

  private updateValidators(): void {
    const customValidators = {
      json: jsonValidator,
      csv: csvValidator,
    };
    const inputValidator = customValidators[this.dataType];
    this.control.setValidators([Validators.required, inputValidator()]);
    this.control.updateValueAndValidity();
  }
}
