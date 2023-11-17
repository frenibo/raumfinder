import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Room } from '../room';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.scss'
})
export class ViewRoomComponent {

  constructor(
    private sharedService: SharedService,
  ) {}

  currentRoom: Room = {
    id: 0,
    name: 'noname',
    floor: '',
    building: '', 
    favorite: false,
  };

  async ngOnInit() {
    this.sharedService.currentRoom.subscribe( currentRoom => this.currentRoom = currentRoom )
  }



  goBack() {
    this.sharedService.goBack();
  }

}
