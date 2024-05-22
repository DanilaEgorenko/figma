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

  calculateContrast(): number {
    const luminance = (r: number, g: number, b: number) => {
      const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const lum1 = luminance(
      this.color1!.pixel.r,
      this.color1!.pixel.g,
      this.color1!.pixel.b
    );
    const lum2 = luminance(
      this.color2!.pixel.r,
      this.color2!.pixel.g,
      this.color2!.pixel.b
    );
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }
}
