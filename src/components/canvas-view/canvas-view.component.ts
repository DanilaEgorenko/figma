import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';

interface IPixel {
  color: string;
  x: number;
  y: number;
}

@Component({
  selector: 'canvas-view',
  templateUrl: './canvas-view.component.html',
  styleUrls: ['./canvas-view.component.scss'],
})
export class CanvasViewComponent implements AfterViewInit, OnChanges {
  width: number | null = null;
  height: number | null = null;
  pixel!: IPixel;

  @Input() url: string = '';

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.drawImage();

    const click$ = fromEvent<MouseEvent>(
      this.canvas.nativeElement,
      'click'
    ).subscribe((event) => {
      this.getColor(event);
    });
  }

  ngOnChanges() {
    this.drawImage();
  }

  drawImage() {
    const ctx = this.canvas?.nativeElement.getContext('2d');
    const img = new Image();
    img.src = this.url;

    img.onload = () => {
      if (ctx) {
        ctx.clearRect(0, 0, 2000, 1000);

        ctx.drawImage(img, 0, 0, 2000, 1000);

        this.width = img.width;
        this.height = img.height;
      }
    };
  }

  getColor(event: MouseEvent): void {
    const [r, g, b] = [
      ...this.canvas.nativeElement
        .getContext('2d')!
        .getImageData(event.offsetX, event.offsetY, 1, 1).data,
    ];
    this.pixel = { ...this.pixel, color: `rgb(${r}, ${g}, ${b})` };
    this.pixel.x = event.offsetX;
    this.pixel.y = event.offsetY;
  }
}
