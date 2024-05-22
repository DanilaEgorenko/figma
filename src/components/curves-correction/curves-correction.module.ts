import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurvesCorrectionComponent } from './curves-correction.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CurvesCorrectionComponent],
  exports: [CurvesCorrectionComponent],
})
export class CurvesCorrectionModule {}
