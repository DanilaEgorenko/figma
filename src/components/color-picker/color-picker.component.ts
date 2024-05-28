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

  rgbToHex(r: number, g: number, b: number): string {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }

  rgbToXyz(r: number, g: number, b: number): string {
    r /= 255;
    g /= 255;
    b /= 255;

    [r, g, b] = [r, g, b].map((val) => {
      return val > 0.04045 ? Math.pow((val + 0.055) / 1.055, 2.4) : val / 12.92;
    });

    const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
    const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
    const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;

    return `x: ${x}, y: ${y}, z: ${z}`;
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
