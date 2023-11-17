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
  complete: boolean = false;

  async ngOnInit() {
    await this.getRooms();
    await this.getFloors();
    await this.getBuildings();
    await this.shareData();
    if(this.complete) {
      this.router.navigate(['startmenu'])
    }
    
  }

  async getRooms() {
    return this.rooms = await lastValueFrom(this.roomService.getRooms())
  }

  async getFloors() {
    return this.floors = await lastValueFrom(this.floorService.getFloors())
  }

  async getBuildings() {
    return this.buildings = await lastValueFrom(this.buildingService.getBuildings())
  }

  async shareData() {
    return this.complete = this.sharedService.loadData(this.rooms, this.floors, this.buildings)
  }


}
