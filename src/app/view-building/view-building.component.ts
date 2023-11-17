import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Building } from '../building';

@Component({
  selector: 'app-view-building',
  templateUrl: './view-building.component.html',
  styleUrl: './view-building.component.scss'
})
export class ViewBuildingComponent {

  constructor(
    private sharedService: SharedService,
  ) {}

  currentBuilding: Building = {
    id: 0,
      name: 'noname',
      street: 'Flughafenallee',
      street_number: '10',
      ort: 'Bremen',
      plz: 28199,
      country: 'Deutschland',
      image: 'default.jpg',
      floor_ids: [1,2,3],
      room_ids: [1,2],
      favorite: false,
  };

  async ngOnInit() {
    this.sharedService.currentBuilding.subscribe( currentBuilding => this.currentBuilding = currentBuilding )
  }
}
