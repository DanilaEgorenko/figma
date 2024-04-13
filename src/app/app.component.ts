import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedFile: any = null;

  curUrl: string = '';
  isActiveForm: boolean = true;

  onFileSelected(event: any): void {
    console.log(event);
    this.selectedFile = event.target.files[0] ?? null;
    this.setCurUrl(URL.createObjectURL(this.selectedFile));
  }

  setCurUrl(url: string): void {
    this.curUrl = url;
    this.isActiveForm = false;
  }
}
