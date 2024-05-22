import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { combineLatest, fromEvent, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChangePropsDialogComponent } from '..';
import { switchMap, takeUntil, map, takeWhile, filter } from 'rxjs/operators';
import { ColorInfo } from '../color-picker/color-picker.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'canvas-view',
  templateUrl: './canvas-view.component.html',
  styleUrls: ['./canvas-view.component.scss'],
})
export class CanvasViewComponent implements OnInit {
  width!: number;
  height!: number;
  pixel!: ColorInfo;

  _percentageValue: number = 100;

  get percentageValue(): number {
    return this._percentageValue;
  }

  set percentageValue(value: number) {
    this.resizeImage(value);
    this._percentageValue = value;
  }

  @Input() url: string = '';
  @Input() activeTool: string = '';
  @Output('lastColor') lastColor = new EventEmitter();
  @Output('altColor') altColor = new EventEmitter();

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private img = new Image();
  private imgX = 0;
  private imgY = 0;

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.img.src = this.url;
    this.img.onload = () => {
      this.width = this.img.width;
      this.height = this.img.height;
      this.imgX = this.canvas.nativeElement.width / 2 - this.width / 2;
      this.imgY = this.canvas.nativeElement.height / 2 - this.height / 2;
      this.drawImageAtPosition(this.imgX, this.imgY);
    };

    const mouseClick$ = fromEvent<MouseEvent>(
      this.canvas.nativeElement,
      'click'
    );

    mouseClick$
      .pipe(
        filter((event) => !event.altKey && !event.ctrlKey && !event.shiftKey)
      )
      .subscribe((event) => {
        this.getColor(event);
        this.lastColor.emit(this.pixel);
      });

    mouseClick$
      .pipe(filter((event) => event.altKey || event.ctrlKey || event.shiftKey))
      .subscribe((event) => {
        this.getColor(event);
        this.altColor.emit(this.pixel);
      });
  }

  ngOnChanges(): void {
    if (this.activeTool === 'move') {
      this.initializeDragAndDrop();
      this.initializeMouseWheel();
    }
  }

  drawImage(src?: string) {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx && this.img.complete) {
      ctx.clearRect(
        0,
        0,
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
      ctx.drawImage(this.img, this.imgX, this.imgY, this.width, this.height);
    }
  }

  resizeImageNeighbor(newWidth: number, newHeight: number) {
    let sourceCtx = this.canvas?.nativeElement.getContext('2d');
    let targetCanvasElement = document.createElement('canvas');
    let targetCtx = targetCanvasElement.getContext('2d');

    let sourceImageData = sourceCtx!.getImageData(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    let targetImageData = targetCtx!.createImageData(newWidth, newHeight);

    let scaleX = this.canvas.nativeElement.width / newWidth;
    let scaleY = this.canvas.nativeElement.height / newHeight;

    for (let y = 0; y < newHeight; y++) {
      for (let x = 0; x < newWidth; x++) {
        let sourceX = Math.round(x * scaleX);
        let sourceY = Math.round(y * scaleY);
        let targetIndex = (y * newWidth + x) * 4;
        let sourceIndex =
          (sourceY * this.canvas.nativeElement.width + sourceX) * 4;
        for (let i = 0; i < 4; i++) {
          targetImageData.data[targetIndex + i] =
            sourceImageData.data[sourceIndex + i];
        }
      }
    }

    this.width = newWidth;
    this.height = newHeight;

    sourceCtx!.clearRect(
      0,
      0,
      Math.max(this.canvas.nativeElement.width, 30000),
      Math.max(this.canvas.nativeElement.height, 30000)
    );

    this.canvas?.nativeElement
      .getContext('2d')!
      .putImageData(targetImageData, 0, 0);
    this.canvas.nativeElement.toBlob((newBlob) => {
      this.drawImage(URL.createObjectURL(newBlob!));
    });
  }

  getPixel(x: number, y: number) {
    const image = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1;
    canvas.height = 1;
    ctx!.drawImage(image, x, y, 1, 1, 0, 0, 1, 1);
    const data = ctx!.getImageData(0, 0, 1, 1).data;
    return { r: data[0], g: data[1], b: data[2] };
  }

  resizeImage(curr: number): void {
    this.width = Math.ceil(
      (this.width / (this.percentageValue / 100)) * (curr / 100)
    );
    this.height = Math.ceil(
      (this.height / (this.percentageValue / 100)) * (curr / 100)
    );
    this.drawImage();
  }

  getColor(event: MouseEvent): void {
    const offsetX = (event.offsetX * this.percentageValue) / 100;
    const offsetY = (event.offsetY * this.percentageValue) / 100;
    const [r, g, b] = [
      ...this.canvas.nativeElement
        .getContext('2d')!
        .getImageData(offsetX, offsetY, 1, 1).data,
    ];
    this.pixel = {
      ...this.pixel,
      color: `rgb(${r}, ${g}, ${b})`,
      pixel: { r, g, b },
    };
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
      this.resizeImageNeighbor(width, height);
    });
  }

  downloadPhoto(): void {
    const downloadLink = document.createElement('a');
    downloadLink.href = this.canvas.nativeElement.toDataURL('image/jpeg');
    downloadLink.download = this.url + '.jpg';
    downloadLink.click();
  }

  initializeDragAndDrop() {
    const canvasEl = this.canvas.nativeElement;
    const mouseDown$ = fromEvent<MouseEvent>(canvasEl, 'mousedown');
    const mouseMove$ = fromEvent<MouseEvent>(canvasEl, 'mousemove');
    const mouseUp$ = fromEvent<MouseEvent>(canvasEl, 'mouseup');
    const mouseLeave$ = fromEvent<MouseEvent>(canvasEl, 'mouseleave');

    const drag$ = mouseDown$.pipe(
      switchMap((startEvent) => {
        const offsetX =
          startEvent.clientX -
          canvasEl.getBoundingClientRect().left -
          this.imgX;
        const offsetY =
          startEvent.clientY - canvasEl.getBoundingClientRect().top - this.imgY;

        return mouseMove$.pipe(
          map((moveEvent) => {
            let newX =
              moveEvent.clientX -
              canvasEl.getBoundingClientRect().left -
              offsetX;
            let newY =
              moveEvent.clientY -
              canvasEl.getBoundingClientRect().top -
              offsetY;

            // Проверка выхода за границы канваса
            if (newX > 0) {
              newX = 0;
            } else if (newX < canvasEl.width - this.width) {
              newX = canvasEl.width - this.width;
            }

            if (newY > 0) {
              newY = 0;
            } else if (newY < canvasEl.height - this.height) {
              newY = canvasEl.height - this.height;
            }

            return { x: newX, y: newY };
          }),
          takeUntil(mouseUp$),
          takeUntil(mouseLeave$),
          takeWhile(() => this.activeTool === 'move')
        );
      })
    );

    drag$.subscribe((pos) => {
      this.imgX = pos.x;
      this.imgY = pos.y;
      this.drawImageAtPosition(this.imgX, this.imgY);
    });
  }

  initializeMouseWheel() {
    const canvasEl = this.canvas.nativeElement;
    fromEvent<WheelEvent>(canvasEl, 'wheel').subscribe((event) => {
      event.preventDefault();

      let deltaX = event.deltaX;
      let deltaY = event.deltaY;

      if (event.shiftKey) {
        deltaX *= 5; // Ускоренная прокрутка при нажатом Shift
        deltaY *= 5;
      }

      let newX = this.imgX - deltaX;
      let newY = this.imgY - deltaY;

      if (newX > 0) {
        newX = 0;
      } else if (newX < this.canvas.nativeElement.width - this.width) {
        newX = this.canvas.nativeElement.width - this.width;
      }

      if (newY > 0) {
        newY = 0;
      } else if (newY < this.canvas.nativeElement.height - this.height) {
        newY = this.canvas.nativeElement.height - this.height;
      }

      this.imgX = newX;
      this.imgY = newY;
      this.drawImageAtPosition(this.imgX, this.imgY);
    });
  }

  drawImageAtPosition(x: number, y: number) {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      ctx.clearRect(
        0,
        0,
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
      ctx.drawImage(this.img, x, y, this.width, this.height);
    }
  }
}
