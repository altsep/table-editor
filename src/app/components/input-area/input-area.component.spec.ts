import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputAreaComponent } from './input-area.component';

describe('InputAreaComponent', () => {
  let component: InputAreaComponent;
  let fixture: ComponentFixture<InputAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputAreaComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(InputAreaComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('', Validators.required);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
