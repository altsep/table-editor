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
  public form = this.fb.group({
    json: this.fb.control('', [Validators.required, notJsonValidator()]),
    csv: this.fb.control('', [Validators.required, notCsvValidator()]),
  });

  public dataType = this.dataFormatService.dataType$.getValue();

  public get data(): string {
    return this.form.controls[this.dataType].value || '';
  }

  public set data(value: string | undefined) {
    if (value != null) {
      this.form.controls[this.dataType].setValue(value);
    }
  }

  constructor(private fb: FormBuilder, private dataFormatService: DataService, private dataService: DataService) {
    this.dataFormatService.dataType$.pipe(takeUntilDestroyed()).subscribe((mode) => {
      this.dataType = mode;
    });

    this.dataService.data$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.data = data;
    });
  }

  public load(): void {
    this.dataService.data$.next(this.data);
  }
}
