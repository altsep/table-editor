import { Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  public control = new FormControl('', [Validators.required]);

  public dataType = this.dataService.getDataType();

  public get data(): string {
    return <string>this.control.value;
  }

  @Input() public set data(value: string) {
    this.control.setValue(value);
  }

  @Output() public dataChange = new EventEmitter<string>();

  constructor(private dataService: DataService) {
    this.dataService.dataType$.pipe(takeUntilDestroyed()).subscribe((mode) => {
      this.dataType = mode;
    });
  }

  public load(): void {
    this.dataChange.emit(this.data);
  }
}
