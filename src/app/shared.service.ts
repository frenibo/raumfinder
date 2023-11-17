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
import { CookieService } from 'ngx-cookie-service';


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
    private cookie: CookieService,
  ) { }

  rooms: Room[] = [];
  floors: Floor[] = [];
  buildings: Building[] = [];
  //fav_rooms: string[] = [];
  //fav_buildings: string[] = [];

  roomsChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  floorsChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  buildingsChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  loadingComplete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  currentRoom: BehaviorSubject<Room> = new BehaviorSubject<Room>(
    {
      id: 0,
      name: 'noname',
      floor: '',
      building: '',
      favorite: false,
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
      favorite: false,
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

  async updateCurrentRoomById(id: number) {
    if(this.rooms.find( room => room.id == id)){
      this.currentRoom.next(this.rooms.find( room => room.id == id)!);
    }
  }

  async updateCurrentBuildingById(id: number) {
    if(this.buildings.find( building => building.id == id)){
      this.currentBuilding.next(this.buildings.find( building => building.id == id)!);
    }
  }

  async loadAllData() {
    //this.cookie.deleteAll(); //must be removed once testing cookie behavior is finished
    this.rooms = await lastValueFrom(this.roomService.getRooms());
    this.floors = await lastValueFrom(this.floorService.getFloors());
    this.buildings = await lastValueFrom(this.buildingService.getBuildings());
    this.getFavRooms();
    this.getFavBuildings();
    this.loadingComplete.next(true);
  }

  async checkLoaded() {
    if(this.loadingComplete.value == false ){
      this.rooms = await lastValueFrom(this.roomService.getRooms())
      this.floors = await lastValueFrom(this.floorService.getFloors())
      this.buildings = await lastValueFrom(this.buildingService.getBuildings())
      //this.fav_rooms = await this.getFavRooms();
      //this.fav_buildings = await this.getFavBuildings();
      //this.loadingComplete.next(true)
    }
  }

  getFavRooms() {
    if(this.cookie.get('favorite-rooms') === '') {
      this.cookie.set('favorite-rooms', '/')
    }
    const favIds = this.cookie.get('favorite-rooms').split('/').filter(i => i);
    // filter( i => i) excludes empty string elements as explained here by user1079877:
    // "if you have more than one space character, you'll have empty string ('') in your results, and because if('') is false, filter function filter strip them in the final result."
    // https://stackoverflow.com/questions/9141951/splitting-string-by-whitespace-without-empty-elements

    for(var j=0; j<favIds.length; j++) {
      for(var i=0; i<this.rooms.length; i++) {
        if(this.rooms[i].id == Number(favIds[j])) {
          this.rooms[i].favorite = true;
        }
      }
    }
    this.roomsChanged.next(!this.roomsChanged.value);
    
  }

  getFavBuildings() {
    if(this.cookie.get('favorite-buildings') === '') {
      this.cookie.set('favorite-buildings', '/')
    }
    const favIds = this.cookie.get('favorite-buildings').split('/').filter(i => i);
    // filter( i => i) excludes empty string elements as explained here by user1079877:
    // "if you have more than one space character, you'll have empty string ('') in your results, and because if('') is false, filter function filter strip them in the final result."
    // https://stackoverflow.com/questions/9141951/splitting-string-by-whitespace-without-empty-elements

    for(var j=0; j<favIds.length; j++) {
      for(var i=0; i<this.buildings.length; i++) {
        if(this.buildings[i].id == Number(favIds[j])) {
          this.buildings[i].favorite = true;
        }
      }
    }
    this.buildingsChanged.next(!this.buildingsChanged.value);
    
  }

  async deleteFav(id: number, key: string) {
    if(key === 'favorite-rooms') {
      const value: string =  this.cookie.get(key).split('/').filter(i => i !== String(id)).join('/');
      this.cookie.set(key, value);
      //this.fav_rooms = await this.getFavRooms();
      this.rooms.forEach(room => {
        room.id === id ? room.favorite = false : null
      });
      this.roomsChanged.next(!this.roomsChanged.value);
    }
    if( key === 'favorite-buildings') {
      const value: string =  this.cookie.get(key).split('/').filter(i => i !== String(id)).join('/');
      this.cookie.set(key, value);
      //this.fav_buildings = await this.getFavBuildings();
      this.buildings.forEach(building => {
        building.id === id ? building.favorite = false : null
      });
      this.buildingsChanged.next(!this.buildingsChanged.value);
    }
  }

  async addFav(id: number, key: string) {
    if(key === 'favorite-rooms') {
      const value: string =  this.cookie.get(key).concat(String(id)+'/');
      this.cookie.set(key, value);
      //this.fav_rooms = await this.getFavRooms();
      this.rooms.forEach(room => {
        room.id === id ? room.favorite = true : null
      });
      this.roomsChanged.next(!this.roomsChanged.value);
    }
    if( key === 'favorite-buildings') {
      const value: string =  this.cookie.get(key).concat(String(id)+'/');
      this.cookie.set(key, value);
      //this.fav_buildings = await this.getFavBuildings();
      this.buildings.forEach(building => {
        building.id === id ? building.favorite = true : null
      });
      this.buildingsChanged.next(!this.buildingsChanged.value);
    }
  }

  clearFaves() {
    this.rooms.forEach(room => {
      room.favorite ? room.favorite = false : null
    });
    this.cookie.set('favorite-rooms', '/');
    this.roomsChanged.next(!this.roomsChanged.value);


    this.buildings.forEach(building => {
      building.favorite ? building.favorite = false : null
    });
    this.cookie.set('favorite-buildings', '/');
    this.buildingsChanged.next(!this.buildingsChanged.value);
  }

}


/*
    const favdIdsAsNumber: Number[] = favIdsAsSrting.map(function(item) {
      return Number(item)
    })
    //Converts String[] to Number[]
    */