import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ColorInfo } from 'src/components/color-picker/color-picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedFile: any = null;

  curUrl: string = '';
  isActiveForm: boolean = true;
  activeTool: string = '';
  pipetteColor: ColorInfo | null = null;
  pipetteColor2: ColorInfo | null = null;
  kernel: any = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  preview: boolean = false;

  @ViewChild('canvas') canvas: any;

  constructor(private cdr: ChangeDetectorRef) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    this.setCurUrl(URL.createObjectURL(this.selectedFile));
  }

  setCurUrl(url: string): void {
    this.curUrl = url;
    this.isActiveForm = false;
  }

  changeActiveTool(value: string): void {
    this.activeTool = value;
    this.cdr.detectChanges();
  }

  setPipetteColor(pixel: ColorInfo | null) {
    this.pipetteColor = pixel;
  }

  setAltPipetteColor(pixel: ColorInfo | null) {
    this.pipetteColor2 = pixel;
  }

  setKernel(kernel: any) {
    this.kernel = kernel;
  }

  setPreview(preview: boolean) {
    this.preview = preview;
  }
}
