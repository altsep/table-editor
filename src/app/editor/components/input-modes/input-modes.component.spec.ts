import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputModesComponent } from './input-modes.component';

describe('InputModesComponent', () => {
  let component: InputModesComponent;
  let fixture: ComponentFixture<InputModesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputModesComponent],
    });
    fixture = TestBed.createComponent(InputModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
