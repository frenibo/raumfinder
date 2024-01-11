import { Component } from '@angular/core';
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
  selector: 'app-dialog-map',
  templateUrl: './dialog-map.component.html',
  styleUrl: './dialog-map.component.scss'
})
export class DialogMapComponent {

  async ngOnInit() {
    //this.dialogRef.updateSize('80%', '80%');
  }

}
