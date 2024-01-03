import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { BuildingService } from '../building.service';
import { FloorService } from '../floor.service';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { Floor } from '../floor';
import { Building } from '../building';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-unlock-rooms',
  templateUrl: './unlock-rooms.component.html',
  styleUrl: './unlock-rooms.component.scss'
})
export class UnlockRoomsComponent {

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
    this.dataSource = new MatTableDataSource(this.rooms);
    const filterValue = (event.target as HTMLInputElement).value;
    const filterArray = filterValue.toLocaleLowerCase().split(' ');
    filterArray.forEach(filterValue => {
      this.dataSource.filter = filterValue;
      this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
    });
  }

  clearFilter() {
    this.dataSource.filter = "";
  }

  navigate(location: string, room: Room) {
    const path: string = location.concat('/' + String(room.id));
    this.sharedService.navigate(path);
    this.sharedService.updateCurrentRoom(room);
  }

}
