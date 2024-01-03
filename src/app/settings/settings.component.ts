import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  constructor(
    private sharedService: SharedService,
  ){}

  navigate(location: string) {
    this.sharedService.navigate(location)
  }

}
