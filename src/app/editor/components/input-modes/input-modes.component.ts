import { Component, Input } from '@angular/core';
import { DataFormatService } from '../../services/dataFormat.service';

@Component({
  selector: 'app-input-modes',
  templateUrl: './input-modes.component.html',
  styleUrls: ['./input-modes.component.scss'],
})
export class InputModesComponent {
  public formats = this.dataFormatService.formats;

  @Input() public currentFormat!: string;

  constructor(private dataFormatService: DataFormatService) {}

  public onClick(value: string): void {
    this.dataFormatService.currentFormat$.next(value);
  }
}
