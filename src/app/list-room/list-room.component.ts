import {Component} from '@angular/core';

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
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrl: './list-room.component.scss'
})
export class ListRoomComponent {

  constructor(
    private roomService: RoomService,
    private floorService: FloorService,
    private buildingService: BuildingService,
    private sharedService: SharedService,
  ) {}

  rooms: Room[] = [];
  floors: Floor[] = [];
  buildings: Building[] = [];
  displayedColumns: string[] = ['name', 'building', 'floor'];
  dataSource = new MatTableDataSource(this.rooms);
  defaultValue: string = '';

  async ngOnInit(): Promise<void> {
    await this.checkLoaded();
    this.getRooms();
    this.dataSource = new MatTableDataSource<Room>(this.rooms);
    this.sharedService.currentFilter.subscribe(
      currentFilter => currentFilter ? this.dataSource.filter = this.defaultValue = currentFilter + ' ' : null);
  }

  getRooms() {
    return this.rooms =  this.sharedService.rooms
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

  navigate(location: string, room: Room) {
    this.sharedService.navigate(location);
    this.sharedService.updateCurrentRoom(room);
  }

}
