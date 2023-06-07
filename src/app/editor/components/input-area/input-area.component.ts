import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataFormat } from '../../models/dataFormat.model';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
})
export class InputAreaComponent {
  private defaultValue =
    '[{"name":"Name 1","year":"2010"},{"name":"Name 2","year":"1997"},{"name":"Name 3","year":"2004"}]';

  public form = this.fb.group({
    json: this.fb.control(this.defaultValue),
    csv: this.fb.control(''),
  });

  @Input() public currentFormat!: DataFormat;

  public get data(): string {
    return this.form.value[this.currentFormat] || '';
  }

  @Input() public set data(value: string | undefined) {
    if (value != null && value !== this.form.get(this.currentFormat)?.value) {
      this.form.controls[this.currentFormat].setValue(value);
    }
  }

  @Output() public dataChange = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  public onSubmit(): void {
    const value = this.form.value[this.currentFormat] || '';
    this.dataChange.emit(value);
  }
}
