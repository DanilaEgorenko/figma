import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorInfo } from '../color-picker/color-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../app-filter-dialog/app-filter-dialog.component';

@Component({
  selector: 'app-tool-panel',
  templateUrl: './tool-panel.component.html',
  styleUrls: ['./tool-panel.component.scss'],
})
export class ToolPanelComponent {
  isActive = '';
  @Input() pipetteColor: ColorInfo | null = null;
  @Input() pipetteColor2: ColorInfo | null = null;
  @Output('actualTool') actualTool: EventEmitter<string> = new EventEmitter();
  @Output('setColor') setColor: EventEmitter<string> = new EventEmitter();
  @Output('setKernel') setKernel: EventEmitter<any> = new EventEmitter();
  @Output('setPreview') setPreview: EventEmitter<any> = new EventEmitter();

  changeActive(value: string): void {
    this.isActive = this.isActive === value ? '' : value;
    this.actualTool.emit(this.isActive);
    this.pipetteColor = null;
    this.pipetteColor2 = null;
  }

  constructor(private dialog: MatDialog) {}

  applyCurvesCorrection(): void {}
  resetCurvesCorrection(): void {}

  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '300px',
      data: {},
    });

    dialogRef.componentInstance.previewChange.subscribe((result) => {
      this.setPreview.emit(result);
    });

    dialogRef.componentInstance.kernelChange.subscribe((kernel) => {
      if (dialogRef.componentInstance.preview) this.setKernel.emit(kernel);
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.changeActive('');
      if (result) {
        this.setKernel.emit(result.kernel);
      }
    });
  }
}
