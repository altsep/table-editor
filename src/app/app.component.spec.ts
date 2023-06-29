import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputAreaComponent } from './components/input-area/input-area.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { InputModesComponent } from './components/input-modes/input-modes.component';
import { InputComponent } from './components/input/input.component';
import { ResultFileSaverComponent } from './components/result-file-saver/result-file-saver.component';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { ResultComponent } from './components/result/result.component';
import { DATA_FORMATS } from './constants';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        InputAreaComponent,
        ResultComponent,
        ResultTableComponent,
        InputComponent,
        InputModesComponent,
        InputFileComponent,
        ResultFileSaverComponent,
      ],
      imports: [RouterTestingModule, BrowserModule, AppRoutingModule, ReactiveFormsModule],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as data empty string`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.data).toBeDefined();
  });

  it(`should be defined a data type string`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(DATA_FORMATS).toContain(app.dataType);
  });
});
