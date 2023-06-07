import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { csvValidator } from '../../directives/csv-validator.directive';
import { jsonValidator } from '../../directives/json-validator.directive';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  public form = this.fb.group({
    json: this.fb.control('', [Validators.required, jsonValidator()]),
    csv: this.fb.control('', [Validators.required, csvValidator()]),
  });

  public dataType = this.dataFormatService.getDataType();

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
