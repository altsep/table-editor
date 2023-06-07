import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';
import { InputAreaComponent } from './components/input-area/input-area.component';
import { ResultComponent } from './components/result/result.component';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { InputComponent } from './components/input/input.component';
import { InputModesComponent } from './components/input-modes/input-modes.component';

@NgModule({
  declarations: [
    EditorPageComponent,
    InputAreaComponent,
    ResultComponent,
    ResultTableComponent,
    InputComponent,
    InputModesComponent,
  ],
  imports: [CommonModule, EditorRoutingModule, FormsModule],
})
export class EditorModule {}
