import { Component, Inject } from '@angular/core';
import { Room } from '../../room';
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
  selector: 'app-dialog-info-room',
  templateUrl: './dialog-info-room.component.html',
  styleUrl: './dialog-info-room.component.scss'
})
export class DialogInfoRoomComponent {
  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: {
      room: Room,
    },
  ) {}

  async ngOnInit() {
    //this.dialogRef.updateSize('80%', '80%');
  }

  jaNein(boolean: boolean): string {
    if(boolean == true) {
      return 'Ja'
    }
    else if(boolean == false) {
      return 'Nein'
    }
    else {
      return 'Unbekannt'
    }
  }
}
