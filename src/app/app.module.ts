import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanvasViewModule } from 'src/components/canvas-view/canvas-view.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolPanelModule } from '../components/tool-panel/tool-panel.module';
import { ColorPickerModule } from 'src/components/color-picker/color-picker.module';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CanvasViewModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolPanelModule,
  ],
})
export class AppModule {}
