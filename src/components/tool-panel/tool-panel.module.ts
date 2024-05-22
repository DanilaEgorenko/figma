import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ToolPanelComponent } from './tool-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColorPickerModule } from '../color-picker/color-picker.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ColorPickerModule,
  ],
  declarations: [ToolPanelComponent],
  exports: [ToolPanelComponent],
})
export class ToolPanelModule {}
