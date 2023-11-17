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
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrl: './room-table.component.scss'
})
export class RoomTableComponent {

  constructor(
    private roomService: RoomService,
    private floorService: FloorService,
    private buildingService: BuildingService,
    private sharedService: SharedService,
  ) {}

  rooms: Room[] = [];
  floors: Floor[] = [];
  buildings: Building[] = [];
  displayedColumns: string[] = ['room_number', 'building', 'floor'];
  dataSource = new MatTableDataSource(this.rooms);

  async ngOnInit(): Promise<void> {
    await this.checkLoaded();
    this.getRooms();
    this.dataSource = new MatTableDataSource<Room>(this.rooms);
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

  navigate(location: string, room: Room | undefined) {
    this.sharedService.navigate(location);
  }

}
