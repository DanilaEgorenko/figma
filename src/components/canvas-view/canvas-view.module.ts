import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CanvasViewComponent } from './canvas-view.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CanvasViewComponent],
  exports: [CanvasViewComponent],
})
export class CanvasViewModule {}
