import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { csvValidator } from '../../validators/csv-validator';
import { jsonValidator } from '../../validators/json-validator';

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

  public dataType = this.dataService.getDataType();

  public get data(): string {
    return this.form.controls[this.dataType].value || '';
  }

  public set data(value: string | undefined) {
    if (value != null) {
      const control = this.form.controls[this.dataType];
      control.setValue(value);
    }
  }

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.dataService.dataType$.pipe(takeUntilDestroyed()).subscribe((mode) => {
      this.dataType = mode;
    });

    this.dataService.outputData$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.data = data;
    });
  }

  public load(): void {
    this.dataService.inputData$.next(this.data);
  }
}
