import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorPickerComponent } from './color-picker.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ColorPickerComponent],
  exports: [ColorPickerComponent],
})
export class ColorPickerModule {}
