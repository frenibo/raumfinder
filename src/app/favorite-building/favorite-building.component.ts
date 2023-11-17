import { Component } from '@angular/core';

import { Room } from '../room';
import { RoomService } from '../room.service';
import { Floor } from '../floor';
import { FloorService } from '../floor.service';
import { Building } from '../building';
import { BuildingService } from '../building.service';
import { SharedService } from '../shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-favorite-building',
  templateUrl: './favorite-building.component.html',
  styleUrl: './favorite-building.component.scss'
})
export class FavoriteBuildingComponent {

  constructor(
    private roomService: RoomService,
    private floorService: FloorService,
    private buildingService: BuildingService,
    private sharedService: SharedService,
  ) {}

  rooms: Room[] = [];
  floors: Floor[] = [];
  buildings: Building[] = [];
  displayedColumns: string[] = ['image', 'name', 'street'];
  dataSource = new MatTableDataSource(this.buildings);

  async ngOnInit(): Promise<void> {
    await this.checkLoaded();
    this.getBuildings();
    this.dataSource = new MatTableDataSource<Building>(this.buildings.filter(building => building.favorite == true));
  }

  getBuildings() {
    return this.buildings =  this.sharedService.buildings
  }

  async checkLoaded() {
    return await this.sharedService.checkLoaded();
  }

  navigate(location: string, building: Building) {
    this.sharedService.navigate(location);
    this.sharedService.updateCurrentBuilding(building);
  }

}
