import { Component, Input } from '@angular/core';
import { DataFormat } from '../../models/dataFormat.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-input-modes',
  templateUrl: './input-modes.component.html',
  styleUrls: ['./input-modes.component.scss'],
})
export class InputModesComponent {
  public modes = this.dataFormatService.modes;

  @Input() public currentMode!: DataFormat;

  constructor(private dataFormatService: DataService) {}

  public onClick(value: DataFormat): void {
    this.dataFormatService.setMode(value);
  }
}
