import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CanvasViewComponent } from './canvas-view.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangePropsDialogComponent } from '../change-props-dialog/change-props-dialog.component';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSelectModule,
  ],
  declarations: [CanvasViewComponent, ChangePropsDialogComponent],
  exports: [CanvasViewComponent],
})
export class CanvasViewModule {}
