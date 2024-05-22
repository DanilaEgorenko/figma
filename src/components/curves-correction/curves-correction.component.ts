import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-curves-correction',
  templateUrl: './curves-correction.component.html',
  styleUrls: ['./curves-correction.component.scss'],
})
export class CurvesCorrectionComponent {
  @Output() apply = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @ViewChild('histogramR') histogramR!: ElementRef<HTMLCanvasElement>;
  @ViewChild('histogramG') histogramG!: ElementRef<HTMLCanvasElement>;
  @ViewChild('histogramB') histogramB!: ElementRef<HTMLCanvasElement>;
  @ViewChild('imageCanvas') imageCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.drawHistograms();
  }

  drawHistograms() {
    this.drawHistogram(this.histogramR.nativeElement, 'red');
    this.drawHistogram(this.histogramG.nativeElement, 'green');
    this.drawHistogram(this.histogramB.nativeElement, 'blue');
  }

  drawHistogram(canvas: HTMLCanvasElement, color: string) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = new Array(256).fill(0).map(() => Math.random() * 255);

    const width = canvas.width;
    const height = canvas.height;
    const barWidth = width / 256;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = color;
    data.forEach((value, index) => {
      const barHeight = (value / 255) * height;
      ctx.fillRect(index * barWidth, height - barHeight, barWidth, barHeight);
    });
  }

  point1: Point = { x: 0, y: 0 };
  point2: Point = { x: 255, y: 255 };
  preview: boolean = false;
  lines: { x1: number; y1: number; x2: number; y2: number }[] = [];

  ngOnInit() {
    this.updateCurve();
  }

  applyCorrection(): void {
    this.apply.emit();
  }

  resetValues(): void {
    this.point1 = { x: 0, y: 0 };
    this.point2 = { x: 255, y: 255 };
    this.updateCurve();
    this.reset.emit();
  }

  closeDialog(): void {
    this.close.emit();
  }

  updateCurve(): void {
    this.lines = [
      { x1: 0, y1: 255, x2: this.point1.x, y2: 255 - this.point1.y },
      {
        x1: this.point1.x,
        y1: 255 - this.point1.y,
        x2: this.point2.x,
        y2: 255 - this.point2.y,
      },
      { x1: this.point2.x, y1: 255 - this.point2.y, x2: 255, y2: 0 },
    ];
  }
}
