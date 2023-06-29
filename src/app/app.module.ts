import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputAreaComponent } from './components/input-area/input-area.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { InputModesComponent } from './components/input-modes/input-modes.component';
import { InputComponent } from './components/input/input.component';
import { ResultFileSaverComponent } from './components/result-file-saver/result-file-saver.component';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { ResultComponent } from './components/result/result.component';

@NgModule({
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
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
