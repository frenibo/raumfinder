import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-info-building',
  templateUrl: './dialog-info-building.component.html',
  styleUrl: './dialog-info-building.component.scss'
})
export class DialogInfoBuildingComponent {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: {
    },
  ) {}

  async ngOnInit() {
    this.dialogRef.updateSize('80%', '80%');
  }

}
