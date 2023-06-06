import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';
import { InputAreaComponent } from './components/input-area/input-area.component';
import { ResultTableComponent } from './components/result-table/result-table.component';

@NgModule({
  declarations: [EditorPageComponent, InputAreaComponent, ResultTableComponent],
  imports: [CommonModule, EditorRoutingModule],
})
export class EditorModule {}
