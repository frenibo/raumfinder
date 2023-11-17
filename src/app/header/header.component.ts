import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

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
    this.sharedService.currentLocation?.subscribe( location => this.changeLocation(location));
  }

  goBack() {
    this.sharedService.goBack();
  }

  changeLocation(location: string) {
    console.log(location);
    this.currentLocation = location;
  }
}
