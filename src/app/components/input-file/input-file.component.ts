import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DataType } from '../../types/dataFormat.type';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent {
  @Output() public dataChange = new EventEmitter<string>();

  @ViewChild('input') public inputRef!: ElementRef<HTMLInputElement>;

  @Input() public set dataType(_: DataType) {
    if (this.inputRef != null) {
      this.inputRef.nativeElement.value = '';
    }
  }

  public async onChange(e: Event): Promise<void> {
    const target = e.target as HTMLInputElement;
    const file = target.files?.item(0);

    if (file != null) {
      const text = await file.text();
      this.dataChange.emit(text);
    }
  }
}
