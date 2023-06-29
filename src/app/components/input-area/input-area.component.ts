import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataType } from '../../types/dataFormat.type';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
})
export class InputAreaComponent {
  @Input() public control!: FormControl<string | null>;

  @Input() public dataType!: DataType;
}
