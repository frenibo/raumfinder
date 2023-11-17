import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { NavigationEnd } from '@angular/router';
import { Room } from '../room';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private sharedService: SharedService,
  ) {}

  currentLocation: string = 'startmenu';

  currentRoom?: Room | any;

  ngOnInit() {
    this.sharedService.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.currentLocation = event.url.split('/')[1];
        }
      }
    );
    this.sharedService.currentRoom.subscribe( currentRoom => this.currentRoom = currentRoom )
  }

  goBack() {
    this.sharedService.goBack();
  }
}
