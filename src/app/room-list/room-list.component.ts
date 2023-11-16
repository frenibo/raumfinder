import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewEncapsulation, Input, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Room } from '../room';
import { RoomService } from '../room.service';
import { SharedService } from '../shared.service';

import { lastValueFrom } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatSort, MatSortable, Sort, SortDirection } from '@angular/material/sort';
import { ParamMap, Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent implements OnInit {

  constructor(
    private roomService: RoomService,
    private sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  rooms: Room[] = [];
  clickedRows = new Set<Room>();
  displayedColumns: string[] = ['name', 'date', 'privacy'];
  dataSource = new MatTableDataSource(this.rooms);
  roomid: number = 0;
  searchValue = '';
  currentSortDirection: string = '';
  currentSortId: string = '';
  newSort: MatSort = <MatSort>{}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit(): Promise<void> {
    await this.getRooms();
    
    this.dataSource = new MatTableDataSource<Room>(this.rooms);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    this.roomService.currentRooms?.subscribe(currentRooms => this.refresh(currentRooms));
    this.sharedService.filterValue?.subscribe(filterValue => this.dataSource.filter = filterValue);

    this.sort.sortChange.subscribe( () => this.updateCurrentSort());
    this.sharedService.externalSort.subscribe( sort => this.sortDataSourceFromExternal(sort));

  }

  refresh(rooms: Room[]) {
    this.dataSource.data = rooms;
  }

  async getRooms() {
    return this.rooms = await lastValueFrom(this.roomService.getRooms())
  }

  sortDataSource(id: string, direction: SortDirection) {

    this.sort.sort(<MatSortable>{
      id: id,
      start: direction,
    });
  }

  sortDataSourceFromExternal(sort: MatSortable) {
    this.sort.sort(sort);
  }

  updateCurrentSort() {
    //this.dataSource.sort = this.sort;
    this.currentSortId = this.sort.active;
    this.currentSortDirection = String(this.sort.direction);
    this.sharedService.updateListViewSort(<MatSortable>{
      id: this.sort.active,
      start: this.sort.direction,
    });
  }

  empty() {

  }

}
