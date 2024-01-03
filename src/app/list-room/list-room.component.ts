import {Component, ElementRef, ViewChild} from '@angular/core';

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

  @ViewChild('filterInput') filterInput: ElementRef<any> | undefined;

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
    let event = new KeyboardEvent('keyup');
    this.filterInput!.nativeElement.dispatchEvent(event);
  }

  navigate(location: string, room: Room) {
    const path: string = location.concat('/' + String(room.id));
    this.sharedService.navigate(path);
    this.sharedService.updateCurrentRoom(room);
  }

}
