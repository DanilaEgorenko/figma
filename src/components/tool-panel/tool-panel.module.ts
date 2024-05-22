import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ToolPanelComponent } from './tool-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColorPickerModule } from '../color-picker/color-picker.module';
import { CurvesCorrectionModule } from '../curves-correction/curves-correction.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ColorPickerModule,
    CurvesCorrectionModule,
  ],
  declarations: [ToolPanelComponent],
  exports: [ToolPanelComponent],
})
export class ToolPanelModule {}
