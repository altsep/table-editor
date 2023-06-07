import { Component, Input } from '@angular/core';
import { DataType } from '../../models/dataFormat.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-input-modes',
  templateUrl: './input-modes.component.html',
  styleUrls: ['./input-modes.component.scss'],
})
export class InputModesComponent {
  public modes = this.dataFormatService.modes;

  @Input() public dataType!: DataType;

  constructor(private dataFormatService: DataService) {}

  public onClick(value: DataType): void {
    this.dataFormatService.setMode(value);
  }
}
