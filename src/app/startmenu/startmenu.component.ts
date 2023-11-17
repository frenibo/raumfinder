import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-startmenu',
  templateUrl: './startmenu.component.html',
  styleUrl: './startmenu.component.scss'
})
export class StartmenuComponent {

  constructor(
    private router: Router,
    private sharedService: SharedService,
  ) {}

  navigate(location: string) {
    this.sharedService.navigate(location)
  }


}
