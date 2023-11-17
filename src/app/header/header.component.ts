import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { NavigationEnd } from '@angular/router';
import { Room } from '../room';
import { Building } from '../building';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private sharedService: SharedService,
  ) {}

  currentLocation: string = 'startmenu'; //This decides which header is displayed

  currentRoom?: Room | any;
  currentBuilding?: Building | any;

  ngOnInit() {
    //Header component listens for changes in the URL and swaps out the Headers accordingly.
    this.sharedService.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.currentLocation = event.url.split('/')[1];
        }
      }
    );
    this.sharedService.currentRoom.subscribe( currentRoom => this.currentRoom = currentRoom );
    this.sharedService.currentBuilding.subscribe( currentBuilding => this.currentBuilding = currentBuilding );
  }

  goBack() {
    this.sharedService.goBack();
  }

  favedRoom() {
    this.sharedService.addFav(this.currentRoom.id, 'favorite-rooms');
  }

  favedBuilding() {
    this.sharedService.addFav(this.currentBuilding.id, 'favorite-buildings');
  }

  unfavedRoom() {
    this.sharedService.deleteFav(this.currentRoom.id, 'favorite-rooms');
  }

  unfavedBuilding() {
    this.sharedService.deleteFav(this.currentBuilding.id, 'favorite-buildings');
  }

}
