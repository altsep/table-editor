import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAreaComponent } from './input-area.component';

describe('InputAreaComponent', () => {
  let component: InputAreaComponent;
  let fixture: ComponentFixture<InputAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputAreaComponent],
    });
    fixture = TestBed.createComponent(InputAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
