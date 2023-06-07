import { Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { notCsvValidator } from '../../directives/not-csv-validator.directive';
import { notJsonValidator } from '../../directives/not-json-validator.directive';
import { DataModeService } from '../../services/dataMode.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  private defaultValue =
    '[{"name":"Name 1","year":"2010"},{"name":"Name 2","year":"1997"},{"name":"Name 3","year":"2004"}]';

  public form = this.fb.group({
    json: this.fb.control(this.defaultValue, [Validators.required, notJsonValidator()]),
    csv: this.fb.control('', [Validators.required, notCsvValidator()]),
  });

  public currentMode = this.dataFormatService.currentMode$.getValue();

  public get data(): string {
    return this.form.controls[this.currentMode].value || '';
  }

  @Input() public set data(value: string | undefined) {
    if (value != null && value !== this.form.get(this.currentMode)?.value) {
      this.form.controls[this.currentMode].setValue(value);
    }
  }

  @Output() public dataChange = new EventEmitter<string>();

  public error$ = this.utilService.error$;

  constructor(private fb: FormBuilder, private dataFormatService: DataModeService, private utilService: UtilService) {
    this.dataFormatService.currentMode$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.currentMode = data;
    });
  }

  public onClick(): void {
    this.dataChange.emit(this.data);
  }
}
