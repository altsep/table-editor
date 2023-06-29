import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { InputAreaComponent } from '../input-area/input-area.component';
import { InputFileComponent } from '../input-file/input-file.component';
import { InputModesComponent } from '../input-modes/input-modes.component';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent, InputModesComponent, InputFileComponent, InputAreaComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
