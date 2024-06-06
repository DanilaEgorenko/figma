import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './app-filter-dialog.component.html',
  styleUrls: ['./app-filter-dialog.component.scss'],
})
export class FilterDialogComponent {
  kernel: number[][] = [];
  preview: boolean = false;

  @Output() previewChange = new EventEmitter<any>();
  @Output() kernelChange = new EventEmitter<any>();

  private presets: { [key: string]: number[][] } = {
    identity: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    sharpen: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ],
    gaussian: [
      [1 / 16, 1 / 8, 1 / 16],
      [1 / 8, 1 / 4, 1 / 8],
      [1 / 16, 1 / 8, 1 / 16],
    ],
    blur: [
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
    ],
  };

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.kernel = this.presets.identity;
  }

  onPresetChange(event: any) {
    this.kernel = this.presets[event.target.value];
    this.kernelChange.emit(this.kernel);
  }

  reset() {
    this.kernel = this.presets.identity;
  }

  apply() {
    this.dialogRef.close({ kernel: this.kernel, preview: this.preview });
  }

  close() {
    this.dialogRef.close();
  }

  changePreview(): void {
    this.previewChange.emit(this.preview);
  }

  onKernelChange(): void {
    this.kernelChange.emit(this.kernel);
  }
}
