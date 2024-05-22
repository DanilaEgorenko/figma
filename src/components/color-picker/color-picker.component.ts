import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface ColorInfo {
  x: number;
  y: number;
  pixel: { r: number; g: number; b: number };
  color: string;
}

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  @Input() color1: ColorInfo | null = null;
  @Input() color2: ColorInfo | null = null;

  @Output() close = new EventEmitter<void>();

  handleClose(): void {
    this.close.emit();
  }
}
