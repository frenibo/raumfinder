import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { Room } from '../room';
import { Building } from '../building';
import { Floor } from '../floor';
import { BuildingService } from '../building.service';
import { FloorService } from '../floor.service';
import { DialogService } from '../dialog.service';

import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.scss'
})
export class ViewRoomComponent {

  constructor(
    private sharedService: SharedService,
    private buildingService: BuildingService,
    private floorService: FloorService,
    private dialogService: DialogService,
  ) {}

  currentRoom: Room = {
    id: 0,
    name: 'noname',
    floor: '',
    building: '',
    building_id: 0,
    favorite: false,
    unlock: false,
    type: 'Laborraum',
    seats: 0,
    beamer: false,
    beamer_connectors: [],
    whiteboard: false,
    pcs: 0,
  };

  currentRoomBuilding: Building = this.sharedService.defaultBuilding;
  currentRoomBuildingFloors: any[] = [];
  floorName: string = 'EG';
  scrollToggle: boolean = false;
  viewToggle: string[] = [
    'Belegungs',
    'Plan'
  ];
  weekdays: string[] = [
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag'
  ]
  dayNumber: number = 0;

  @ViewChild('toggleButtons') toggleButtons: ElementRef | undefined;

  async ngOnInit() {
    this.sharedService.currentRoom.subscribe( currentRoom => this.getData(currentRoom));
    this.sharedService.roomsChanged.subscribe( roomsChanged => this.sharedService.updateCurrentRoomById(this.currentRoom.id));
  }

  async getData(room: Room) {
    this.currentRoom = room;
    if(this.currentRoom.building_id != 0) {
      this.sharedService.buildings.forEach( building => {
        building.id == this.currentRoom.building_id ? this.currentRoomBuilding = building : null
      });
      this.currentRoomBuildingFloors = [];
      for(let i = 0; i < this.currentRoomBuilding.floor_ids.length; i++) {
        this.sharedService.floors.forEach( floor => {
          floor.id == this.currentRoomBuilding.floor_ids[i] ? this.currentRoomBuildingFloors.push(floor) : null
        });
      }
    }
    this.floorName = this.currentRoom.floor;
  }

  scroll(direction: string) {
    if(direction === 'right' && this.toggleButtons) {
      this.toggleButtons.nativeElement.scrollLeft += ((window.innerWidth + 20) / 5);
    }
    if(direction === 'left' && this.toggleButtons) {
      this.toggleButtons.nativeElement.scrollLeft -= ((window.innerWidth + 20) / 5);
    }
  }

  toggleBlueprint(floorName: string) {
    this.floorName = floorName;
  }

  async openDialogInfoRoom(room: Room) {
    await this.dialogService.openDialogInfoRoom(room);

  }

  toggleView(){
    if(this.viewToggle[0] === 'Raum') {
      this.viewToggle[0] = 'Belegungs';
    }
    else if(this.viewToggle[0] === 'Belegungs') {
      this.viewToggle[0] = 'Raum';
    }
  }

  toggleWeekday(direction: string){
    if(direction === 'vor') {
      this.dayNumber += 1;
    }
    else if(direction === 'zurück') {
      this.dayNumber -= 1;
    }

    if(this.dayNumber == -1) {
      this.dayNumber = 4;
    }
    if(this.dayNumber == 5) {
      this.dayNumber = 0;
    }
  }

  navigate(location: string, replaceUrl?: boolean | undefined, setFilter?: string | undefined) {
    this.sharedService.navigate(location, replaceUrl, setFilter);
  }
}
