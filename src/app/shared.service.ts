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

  currentRoom: BehaviorSubject<Room> = new BehaviorSubject<Room>(
    {
      id: 0,
      name: 'noname',
      floor: '',
      building: '', 
    }
  );

  currentBuilding: BehaviorSubject<Building> = new BehaviorSubject<Building>(
    {
      id: 1,
      name: 'ZIMT',
      street: 'Flughafenallee',
      street_number: '10',
      ort: 'Bremen',
      plz: 28199,
      country: 'Deutschland',
      image: 'default.jpg',
      floor_ids: [1,2,3],
      room_ids: [1,2],
    }
  );

  navigate(location: string): void {
    this.router.navigate([location]);
  }

  goBack() {
    this.location.back();
  }

  updateCurrentRoom(room: Room) {
    this.currentRoom.next(room);
  }

  updateCurrentBuilding(building: Building) {
    this.currentBuilding.next(building);
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
