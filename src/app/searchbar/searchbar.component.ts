import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { lastValueFrom } from 'rxjs';

import { Room } from '../room';
import { RoomService } from '../room.service';
import { SharedService } from '../shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-searchbar',
  //standalone: true,
  //imports: [CommonModule,],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {

  constructor(
    private sharedService: SharedService,
    private roomService: RoomService,
  ) {}

  autocomplete: boolean = true;
  searchValue: string = '';
  rooms: Room[] = [];
  dataSource = new MatTableDataSource(this.rooms);

  async ngOnInit() {
    await this.getRooms();

    this.dataSource = new MatTableDataSource<Room>(this.rooms);

    this.roomService.currentRooms?.subscribe(currentRooms => this.refresh(currentRooms));
    this.sharedService.filterValue?.subscribe(filterValue => this.dataSource.filter = filterValue);
    //this.sharedService.view?.subscribe(view => view !== '' ? this.view = view : this.view );
  }

  async getRooms() {
    return this.rooms = await lastValueFrom(this.roomService.getRooms())
  }

  refresh(rooms: Room[]) {
    this.dataSource.data = rooms;
  }

  applyFilter(event?: Event): void {
    this.sharedService.applyFilter(event);
  }
    
}
