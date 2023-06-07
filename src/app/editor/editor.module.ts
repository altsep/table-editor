import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputAreaComponent } from './components/input-area/input-area.component';
import { InputModesComponent } from './components/input-modes/input-modes.component';
import { InputComponent } from './components/input/input.component';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { ResultComponent } from './components/result/result.component';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';
import { ItemsPipe } from './pipes/items.pipe';
import { CsvPipe } from './pipes/csv.pipe';
import { InputFileComponent } from './components/input-file/input-file.component';
import { ResultFileSaverComponent } from './components/result-file-saver/result-file-saver.component';

@NgModule({
  declarations: [
    EditorPageComponent,
    InputAreaComponent,
    ResultComponent,
    ResultTableComponent,
    InputComponent,
    InputModesComponent,
    ItemsPipe,
    CsvPipe,
    InputFileComponent,
    ResultFileSaverComponent,
  ],
  imports: [CommonModule, EditorRoutingModule, ReactiveFormsModule],
})
export class EditorModule {}
