import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { notCsvValidator } from '../../directives/not-csv-validator.directive';
import { notJsonValidator } from '../../directives/not-json-validator.directive';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  private defaultValueJson =
    '[{"name":"Name 1","year":"2010"},{"name":"Name 2","year":"1997"},{"name":"Name 3","year":"2004"}]';

  private defaultValueCsv = `Year,Make,Model,Length
1997,Ford,E350,2.35
2000,Mercury,Cougar,2.38`;

  public form = this.fb.group({
    json: this.fb.control(this.defaultValueJson, [Validators.required, notJsonValidator()]),
    csv: this.fb.control(this.defaultValueCsv, [Validators.required, notCsvValidator()]),
  });

  public currentMode = this.dataFormatService.currentMode$.getValue();

  public get data(): string {
    return this.form.controls[this.currentMode].value || '';
  }

  public set data(value: string | undefined) {
    if (value != null) {
      this.form.controls[this.currentMode].setValue(value);
    }
  }

  constructor(private fb: FormBuilder, private dataFormatService: DataService, private dataService: DataService) {
    this.dataFormatService.currentMode$.pipe(takeUntilDestroyed()).subscribe((mode) => {
      this.currentMode = mode;
    });

    this.dataService.data$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.data = data;
    });
  }

  public onClick(): void {
    this.dataService.data$.next(this.data);
  }
}
