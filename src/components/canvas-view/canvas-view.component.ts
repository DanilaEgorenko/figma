import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChangePropsDialogComponent } from '..';

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
export class CanvasViewComponent implements OnInit {
  width!: number;
  height!: number;
  pixel!: IPixel;

  _percentageValue: number = 100;

  get percentageValue(): number {
    return this._percentageValue;
  }

  set percentageValue(value: number) {
    this.resizeImage(value);
    this._percentageValue = value;
  }

  @Input() url: string = '';

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.drawImage();
    this.drawImage();

    fromEvent<MouseEvent>(this.canvas.nativeElement, 'click').subscribe(
      (event) => {
        this.getColor(event);
      }
    );
  }

  drawImage() {
    const ctx = this.canvas?.nativeElement.getContext('2d');
    const img = new Image();
    img.src = this.url;

    img.onload = () => {
      if (ctx) {
        ctx.clearRect(0, 0, this.width || 2000, this.height || 1000);
        ctx.imageSmoothingEnabled = false;
        if (!this.width && !this.height) {
          this.width = img.width;
          this.height = img.height;
        }

        ctx.drawImage(img, 0, 0, this.width, this.height);
      }
    };
  }

  resizeImage(curr: number): void {
    this.width = (this.width / (this.percentageValue / 100)) * (curr / 100);
    this.height = (this.height / (this.percentageValue / 100)) * (curr / 100);
  }

  getColor(event: MouseEvent): void {
    const offsetX = (event.offsetX * this.percentageValue) / 100;
    const offsetY = (event.offsetY * this.percentageValue) / 100;
    const [r, g, b] = [
      ...this.canvas.nativeElement
        .getContext('2d')!
        .getImageData(offsetX, offsetY, 1, 1).data,
    ];
    this.pixel = { ...this.pixel, color: `rgb(${r}, ${g}, ${b})` };
    this.pixel.x = offsetX;
    this.pixel.y = offsetY;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePropsDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: {
        width: this.width,
        height: this.height,
        proportions: (this.width || 0) / (this.height || 0),
      },
    });

    dialogRef.afterClosed().subscribe(({ width, height }) => {
      this.width = width;
      this.height = height;
      this.drawImage();
    });
  }

  downloadPhoto(): void {
    const downloadLink = document.createElement('a');
    downloadLink.href = this.canvas.nativeElement.toDataURL('image/jpeg');
    downloadLink.download = this.url;
    downloadLink.click();
  }
}
