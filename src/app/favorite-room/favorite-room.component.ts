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
  selector: 'app-favorite-room',
  templateUrl: './favorite-room.component.html',
  styleUrl: './favorite-room.component.scss'
})
export class FavoriteRoomComponent {

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

  async ngOnInit(): Promise<void> {
    await this.checkLoaded();
    this.getRooms();
    this.dataSource = new MatTableDataSource<Room>(this.rooms.filter(room => room.favorite == true));
  }

  getRooms() {
    return this.rooms =  this.sharedService.rooms
  }

  async checkLoaded() {
    return await this.sharedService.checkLoaded();
  }

  navigate(location: string, room: Room) {
    this.sharedService.navigate(location);
    this.sharedService.updateCurrentRoom(room);
  }

}
