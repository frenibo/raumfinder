import { Component, Inject } from '@angular/core';
import { 
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose, 
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-info-building',
  templateUrl: './dialog-info-building.component.html',
  styleUrl: './dialog-info-building.component.scss'
})
export class DialogInfoBuildingComponent {
  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: {
    },
  ) {}

  async ngOnInit() {
    this.dialogRef.updateSize('80%', '80%');
  }

}
