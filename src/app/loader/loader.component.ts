import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Room } from '../room';
import { RoomService } from '../room.service';
import { Floor } from '../floor';
import { FloorService } from '../floor.service';
import { Building } from '../building';
import { BuildingService } from '../building.service';
import { SharedService } from '../shared.service';

import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  constructor(
    private roomService: RoomService,
    private floorService: FloorService,
    private buildingService: BuildingService,
    private sharedService: SharedService,
    private router: Router,
  ) {}

  rooms: Room[] = [];
  floors: Floor[] = [];
  buildings: Building[] = [];
  loadingComplete: boolean = false;

  async ngOnInit() {

    this.sharedService.loadingComplete.subscribe( loadingComplete => this.loadingState(loadingComplete));
      
  }

  async loadingState(loadingComplete: boolean) {
    if(loadingComplete == true) {
      //this.sharedService.navigate('startmenu');
      this.loadingComplete = true;
    }
    if(loadingComplete == false) {
      this.loadingComplete = false;
      this.sharedService.loadAllData();
    }
  }

}
