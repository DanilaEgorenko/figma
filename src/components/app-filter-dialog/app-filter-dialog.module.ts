import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterDialogComponent } from './app-filter-dialog.component';

@NgModule({
  imports: [CommonModule, FormsModule, MatDialogModule],
  declarations: [FilterDialogComponent],
  exports: [FilterDialogComponent],
})
export class AppFilterDialogModule {}
