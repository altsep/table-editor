import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFileSaverComponent } from './result-file-saver.component';

describe('ResultFileSaverComponent', () => {
  let component: ResultFileSaverComponent;
  let fixture: ComponentFixture<ResultFileSaverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultFileSaverComponent]
    });
    fixture = TestBed.createComponent(ResultFileSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
