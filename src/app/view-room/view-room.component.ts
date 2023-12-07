import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { Room } from '../room';
import { Building } from '../building';
import { Floor } from '../floor';
import { BuildingService } from '../building.service';
import { FloorService } from '../floor.service';

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
  ) {}

  currentRoom: Room = {
    id: 0,
    name: 'noname',
    floor: '',
    building: '',
    building_id: 0,
    favorite: false,
  };

  currentRoomBuilding: Building = this.sharedService.defaultBuilding;
  currentRoomBuildingFloors: any[] = [];
  floorName: string = 'EG';
  scrollToggle: boolean = false;

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
}
