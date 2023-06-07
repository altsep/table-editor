import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataFormat } from '../../models/dataFormat.model';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
})
export class InputAreaComponent {
  @Input() public control!: FormControl<string | null>;

  @Input() public currentMode!: DataFormat;
}
