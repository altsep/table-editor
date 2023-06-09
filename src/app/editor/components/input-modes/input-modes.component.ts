import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DataType } from '../../types/dataFormat.type';

@Component({
  selector: 'app-input-modes',
  templateUrl: './input-modes.component.html',
  styleUrls: ['./input-modes.component.scss'],
})
export class InputModesComponent {
  public modes = this.dataService.modes;

  @Input() public dataType!: DataType;

  constructor(private dataService: DataService) {}

  public onClick(value: DataType): void {
    this.dataService.setMode(value);
  }
}
