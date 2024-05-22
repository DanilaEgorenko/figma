import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorInfo } from '../color-picker/color-picker.component';

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

  changeActive(value: string): void {
    this.isActive = this.isActive === value ? '' : value;
    this.actualTool.emit(this.isActive);
    this.pipetteColor = null;
    this.pipetteColor2 = null;
  }
}
