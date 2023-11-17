import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.scss'
})
export class ViewRoomComponent {

  constructor(
    private sharedService: SharedService,
  ) {}

  goBack() {
    this.sharedService.goBack();
  }

}
