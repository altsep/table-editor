import { Component, Input } from '@angular/core';
import { DataFormat } from '../../models/dataFormat.model';
import { DataModeService } from '../../services/dataMode.service';

@Component({
  selector: 'app-input-modes',
  templateUrl: './input-modes.component.html',
  styleUrls: ['./input-modes.component.scss'],
})
export class InputModesComponent {
  public modes = this.dataFormatService.modes;

  @Input() public currentMode!: DataFormat;

  constructor(private dataFormatService: DataModeService) {}

  public onClick(value: DataFormat): void {
    this.dataFormatService.currentMode$.next(value);
  }
}
