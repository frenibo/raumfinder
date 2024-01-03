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
import { Time } from '@angular/common';

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
  dataSourceRooms = new MatTableDataSource(this.rooms);
  dataSourceBuildings = new MatTableDataSource(this.buildings);
  defaultFilterValue: string = 'ZIMT';
  dateSet: string = '';
  timeSet: string = '';
  startDate: Date | undefined;
  startTime: string | undefined;
  //selectedTimes.B: any[] | undefined;
  format24: number = 24;

  @ViewChild('filterInput') filterInput: ElementRef<any> | undefined;

  async ngOnInit(): Promise<void> {
    await this.checkLoaded();

    await this.getRooms();
    this.dataSourceRooms = new MatTableDataSource<Room>(this.rooms);
    await this.getBuildings();
    this.dataSourceBuildings = new MatTableDataSource<Building>(this.buildings);

    this.sharedService.currentFilter.subscribe(
      currentFilter => currentFilter ? this.defaultFilterValue = currentFilter : this.triggerFilterInput(this.defaultFilterValue));
  }

  async ngAfterViewChecked(): Promise<void> {
    this.triggerFilterInput(this.filterInput!.nativeElement.value);
  }

  async getRooms(): Promise<Room[]> {
    return this.rooms =  this.sharedService.rooms
  }

  async getBuildings(): Promise<Building[]> {
    return this.buildings =  this.sharedService.buildings
  }

  getDate(dateInput?: any): string {
    if(dateInput) {
      //console.log(dateInput.toISOString());
      dateInput = String(dateInput);
      const dateParams = dateInput.split(' ');
      var month = this.convertMonthStringtoNum(dateParams[1]);
      var newDate = String('').concat(dateParams[0], ', ', dateParams[2], '.', month, '.', dateParams[3]);
      this.dateSet = newDate;
    }
    
    if(this.dateSet) {
      var newDate = this.dateSet;
    }
    else {
      const dateParams = Date().split(' ');
      var month = this.convertMonthStringtoNum(dateParams[1]);
      var newDate = String('').concat(dateParams[0], ', ', dateParams[2], '.', month, '.', dateParams[3]);
    }
    return newDate
  }

  convertMonthStringtoNum(month: string): string {
    if(month == 'Jan') { return '01' }
    else if(month == 'Feb') { return '02' }
    else if(month == 'Mar') { return '03' }
    else if(month == 'Apr') { return '04' }
    else if(month == 'May') { return '05' }
    else if(month == 'Jun') { return '06' }
    else if(month == 'Jul') { return '07' }
    else if(month == 'Aug') { return '08' }
    else if(month == 'Sep') { return '09' }
    else if(month == 'Oct') { return '10' }
    else if(month == 'Nov') { return '11' }
    else if(month == 'Dec') { return '12' }

    return '00'
  }

  getTime(timeInput?: any): string {
    if(timeInput) {
      timeInput = String(timeInput)
      const timeParams = timeInput.split(':');
      this.startTime = String('').concat(timeParams[0], ':', timeParams[1]);
      this.timeSet = this.startTime;
    }

    if(this.timeSet) {
      var newTime = this.timeSet;
    }
    else {
      const timeParams = Date().split(' ')[4].split(':');
      this.startTime = String('').concat(timeParams[0], ':', timeParams[1]);
      this.timeSet = this.startTime;
      var newTime = this.timeSet;
    }
    return newTime
  }

  setDate(Date: string) {
    this.dateSet = Date;
  }


  async checkLoaded() {
    return await this.sharedService.checkLoaded();
  }

  applyFilter(event: Event) {
    this.dataSourceRooms = new MatTableDataSource(this.rooms);
    const filterValue = (event.target as HTMLInputElement).value;
    const filterArray = filterValue.toLocaleLowerCase().split(' ');
    filterArray.forEach(filterValue => {
      this.dataSourceRooms.filter = filterValue;
      this.dataSourceRooms = new MatTableDataSource(this.dataSourceRooms.filteredData);
    });
  }

  clearFilter() {
    this.dataSourceBuildings.filter = "";
    this.dataSourceRooms.filter = "";
  }

  navigate(location: string, room: Room) {
    const path: string = location.concat('/' + String(room.id));
    this.sharedService.navigate(path);
    this.sharedService.updateCurrentRoom(room);
  }

  triggerFilterInput(inputValue: string) {
    this.filterInput!.nativeElement.value = inputValue;
    let event = new KeyboardEvent('keyup');
    //let event = new KeyboardEvent('keyup',{'bubbles':true});
    this.filterInput!.nativeElement.dispatchEvent(event);
  }

}
