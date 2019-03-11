import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-area',
  templateUrl: './dialog-area.component.html',
  styleUrls: ['./dialog-area.component.scss']
})
export class DialogAreaComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public templateInfo) { }

  close() {
    let overlay = document.getElementsByClassName("cdk-overlay-backdrop");
    let arrayOverlay: [] = [].slice.call(overlay);

    arrayOverlay.forEach((o: HTMLElement) => {
      o.style.display = "none";
    });

    let panel= document.getElementsByClassName("cdk-overlay-pane");
    let arrayPanel: [] = [].slice.call(panel);

    arrayPanel.forEach((p: HTMLElement) => {
      p.style.display = "none";
    });
  }

}
