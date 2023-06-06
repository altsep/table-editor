import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss'],
})
export class InputAreaComponent {
  public value = '[{"name":"Name 1","year":"2010"},{"name":"Name 2","year":"1997"},{"name":"Name 3","year":"2004"}]';

  @Output() public sourceDataChange = new EventEmitter<string>();

  public onSubmit(): void {
    this.sourceDataChange.emit(this.value);
  }
}
