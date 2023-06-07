import { Component, Input } from '@angular/core';
import { DataFormatService } from '../../services/dataFormat.service';
import { DataFormat } from '../../models/dataFormat.model';

@Component({
  selector: 'app-input-modes',
  templateUrl: './input-modes.component.html',
  styleUrls: ['./input-modes.component.scss'],
})
export class InputModesComponent {
  public formats = this.dataFormatService.formats;

  @Input() public currentFormat!: DataFormat;

  constructor(private dataFormatService: DataFormatService) {}

  public onClick(value: DataFormat): void {
    this.dataFormatService.currentFormat$.next(value);
  }
}
