import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-props-dialog',
  templateUrl: './change-props-dialog.component.html',
  styleUrls: ['./change-props-dialog.component.scss'],
})
export class ChangePropsDialogComponent {
  changeInPercentages: boolean = false;
  saveProportions: boolean = false;
  height: number;
  width: number;

  setHeight(value: number) {
    if (this.changeInPercentages) {
      this.height *= Math.ceil(value / 100);
    } else {
      this.height = value;
    }
    if (this.saveProportions) {
      this.width = Math.round(
        this.height *
          this.data.proportions *
          (this.data.proportions > 1 ? 1 : -1)
      );
    }
  }

  setWidth(value: number) {
    if (this.changeInPercentages) {
      this.width *= Math.ceil(value / 100);
    } else {
      this.width = value;
    }
    if (this.saveProportions) {
      this.height = Math.round(
        this.width *
          this.data.proportions *
          (this.data.proportions > 1 ? 1 : -1)
      );
    }
  }

  constructor(
    private dialogRef: MatDialogRef<ChangePropsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.height = data.height;
    this.width = data.width;
  }

  save(): void {
    this.dialogRef.close({ width: this.width, height: this.height });
  }

  close(): void {
    this.dialogRef.close();
  }
}
