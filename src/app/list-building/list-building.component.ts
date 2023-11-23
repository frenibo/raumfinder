import {Component, ViewChild} from '@angular/core';

import { Room } from '../room';
import { RoomService } from '../room.service';
import { Floor } from '../floor';
import { FloorService } from '../floor.service';
import { Building } from '../building';
import { BuildingService } from '../building.service';
import { SharedService } from '../shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrl: './list-building.component.scss'
})
export class ListBuildingComponent {

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
  defaultValue: string = '';

  async ngOnInit(): Promise<void> {
    await this.checkLoaded();
    this.getBuildings();
    this.dataSource = new MatTableDataSource<Building>(this.buildings);
  }

  getBuildings() {
    return this.buildings =  this.sharedService.buildings
  }

  async checkLoaded() {
    return await this.sharedService.checkLoaded();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilter() {
    this.dataSource.filter = "";
  }

  navigate(location: string, building: Building) {
    this.sharedService.navigate(location);
    this.sharedService.updateCurrentBuilding(building);
  }

}
