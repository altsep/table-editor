import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent {
  @Output() public dataChange = new EventEmitter<string>();

  @ViewChild('input') public inputRef!: ElementRef<HTMLInputElement>;

  constructor(dataService: DataService) {
    dataService.dataType$.pipe(takeUntilDestroyed(), skip(1)).subscribe(() => {
      this.inputRef.nativeElement.value = '';
    });
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
