import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, lastValueFrom } from 'rxjs';
import { Room } from './room';
import { RoomService } from './room.service';
import { Floor } from './floor';
import { FloorService } from './floor.service';
import { Building } from './building';
import { BuildingService } from './building.service';

import { LoaderComponent } from './loader/loader.component';

import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ParamMap, Params, Router } from '@angular/router';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private roomService: RoomService,
    private floorService: FloorService,
    private buildingService: BuildingService,
    public router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  rooms: Room[] = [];
  floors: Floor[] = [];
  buildings: Building[] = [];
  complete: boolean = false;

  history: string[] = [];
  history_position: number = 0;

  currentLocation: BehaviorSubject<string> = new BehaviorSubject('startmenu');

  currentRoom: Room = {
    id: 0,
    name: '',
    floor: '',
    building: '', 
  };

  currentBuilding: Building = {
    id: 1,
    building_name: 'ZIMT',
    building_street: 'Flughafenallee',
    building_number: '10',
    building_ort: 'Bremen',
    building_plz: 28199,
    building_country: 'Deutschland',
    building_image: 'default.jpg',
    floor_ids: [1,2,3],
    room_ids: [1,2],
  };

  navigate(location: string): void {
    console.log('first', this.history);
    this.router.navigate([location]);

    while(this.history_position < this.history.length){
      this.history.pop();
    }
    
    this.history_position = this.history.push(location) -1;
    
    this.currentLocation.next(location);

  }


  goBack() {
    if(this.history_position > 0) {
      this.location.back();
      this.history_position -= 1;
      console.log(this.history[this.history_position]);
      this.currentLocation.next(this.history[this.history_position]);
    }
  }

  loadData(rooms: Room[], floors: Floor[], buildings: Building[]): boolean {
    this.rooms = rooms;
    this.floors = floors;
    this.buildings = buildings;
    this.complete = true;
    return this.complete
  }

  async checkLoaded() {
    if(this.complete == false ){
      this.rooms = await lastValueFrom(this.roomService.getRooms())
      this.floors = await lastValueFrom(this.floorService.getFloors())
      this.buildings = await lastValueFrom(this.buildingService.getBuildings())
    }
    return this.complete = true
  }

}
