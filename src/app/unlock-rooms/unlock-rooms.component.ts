import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { SharedService } from '../shared.service';
import { BuildingService } from '../building.service';
import { FloorService } from '../floor.service';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { Floor } from '../floor';
import { Building } from '../building';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {AsyncPipe} from '@angular/common';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-unlock-rooms',
  templateUrl: './unlock-rooms.component.html',
  styleUrl: './unlock-rooms.component.scss'
})
export class UnlockRoomsComponent {

  // Chip constants
  separatorKeysCodes: number[] = [ENTER, COMMA];
  unlockedRooms: Room[] = [];

  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);
  
  constructor(
    private roomService: RoomService,
    private floorService: FloorService,
    private buildingService: BuildingService,
    private sharedService: SharedService,
    private _snackBar: MatSnackBar,
    private dialogService: DialogService,
  ) {}

  rooms: Room[] = [];
  floors: Floor[] = [];
  buildings: Building[] = [];
  displayedColumns: string[] = ['name', 'building', 'floor'];
  dataSource = new MatTableDataSource(this.rooms);
  defaultValue: string = '';
  durationInSeconds: number = 1;

  async ngOnInit(): Promise<void> {
    await this.checkLoaded();
    this.getRooms();
    this.dataSource = new MatTableDataSource<Room>(this.rooms);

    this.sharedService.unlockedRooms.subscribe( unlockedRooms => this.unlockedRooms = unlockedRooms);
    this.sharedService.roomsChanged.subscribe( roomsChanged => this.getRooms());

    this.triggerInfoDialog();
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
    this.dataSource.filter = '';
    let event = new KeyboardEvent('keyup');
    this.filterInput!.nativeElement.dispatchEvent(event);
  }

  navigate(location: string, room: Room) {
    const path: string = location.concat('/' + String(room.id));
    this.sharedService.navigate(path);
    this.sharedService.updateCurrentRoom(room);
  }

  // Chip Methods

  unlockRoom(room: Room) {
    if(this.unlockedRooms.indexOf(room) == -1) {
      this.unlockedRooms.push(room);
      this.sharedService.unlockedRooms.next(this.unlockedRooms);
    }
    this.filterInput.nativeElement.value = '';
    this.openSnackBar('Raum freigeschaltet');
  }

  add(event: MatChipInputEvent): void {
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(room: Room): void {
    const index = this.unlockedRooms.indexOf(room);

    if (index >= 0) {
      this.unlockedRooms.splice(index, 1);
      this.sharedService.unlockedRooms.next(this.unlockedRooms);
      this.announcer.announce(`Removed ${room}`);
    }

    this.openSnackBar('Freischaltung aufgehoben');
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.unlockedRooms.push(event.option.value);
    this.sharedService.unlockedRooms.next(this.unlockedRooms);
    this.filterInput.nativeElement.value = '';
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

  triggerInfoDialog() {
    if(!this.sharedService.unlockInfo) {
      this.dialogService.openDialogInfoUnlock();
      this.sharedService.unlockInfo = true;
    }
  }

}
