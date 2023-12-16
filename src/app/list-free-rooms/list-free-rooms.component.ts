import { Component, ElementRef, ViewChild } from '@angular/core';

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
  selector: 'app-list-free-rooms',
  templateUrl: './list-free-rooms.component.html',
  styleUrl: './list-free-rooms.component.scss'
})
export class ListFreeRoomsComponent {

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
  dateSet: string = '';
  startDate: Date | undefined;

  @ViewChild('input') input: ElementRef<any> | undefined;

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

  getDate(dateInput?: any): string { 
    console.log(this.input);
    if(dateInput) {
      this.dateSet = dateInput;
    }
    
    if(this.dateSet) {
      var newDate = this.dateSet;
    }
    else {
      const dateParams = Date().split(' ');
      const timeParams = dateParams[4].split(':');
      var newDate = String('').concat(dateParams[2], '. ', dateParams[1], ' ', dateParams[3], ' ', timeParams[0], ':', timeParams[1]);
    }
    return newDate;
  }

  setDate(Date: string) {
    this.dateSet = Date;
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
