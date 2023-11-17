import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { NavigationEnd } from '@angular/router';

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

  ngOnInit() {
    this.sharedService.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentLocation = event.url.split('/')[1];
      }
      });
  }

  goBack() {
    this.sharedService.goBack();
  }

  changeLocation(location: string) {
    console.log(location);
    this.currentLocation = location;
  }
}
