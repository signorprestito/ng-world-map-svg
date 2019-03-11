import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-point',
  templateUrl: './dialog-point.component.html',
  styleUrls: ['./dialog-point.component.scss']
})
export class DialogPointComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogPointComponent>,
    @Inject(MAT_DIALOG_DATA) public templateInfo) { }

  close() {
    let overlay = document.getElementsByClassName("cdk-overlay-backdrop");
    let arrayOverlay : HTMLElement[] = [].slice.call(overlay);

    arrayOverlay.forEach((o : HTMLElement) => {
      o.style.display = "none";
    });

    let panel= document.getElementsByClassName("cdk-overlay-pane");
    let arrayPanel: HTMLElement[] = [].slice.call(panel);

    arrayPanel.forEach((p: HTMLElement) => {
      p.style.display = "none";
    });
  }

}
