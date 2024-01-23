import {Injectable} from '@angular/core';
import {BehaviorSubject, lastValueFrom} from 'rxjs';
import {Room} from './room';
import {RoomService} from './room.service';
import {Floor} from './floor';
import {FloorService} from './floor.service';
import {Building} from './building';
import {BuildingService} from './building.service';

import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';


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

  unlockInfo: boolean = false;

  rooms: Room[] = [];
  floors: Floor[] = [];
  buildings: Building[] = [];

  defaultRoom: Room = {
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
  }

  defaultBuilding: Building = {
    id: 0,
    name: 'Noname',
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

  roomsChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  floorsChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  buildingsChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  loadingComplete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  currentFilter: BehaviorSubject<string> = new BehaviorSubject<string>('');

  currentLocation: BehaviorSubject<string> = new BehaviorSubject<string>('');

  currentRoom: BehaviorSubject<Room> = new BehaviorSubject<Room>(this.defaultRoom);

  currentBuilding: BehaviorSubject<Building> = new BehaviorSubject<Building>(this.defaultBuilding);

  unlockedRooms: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);

  navigate(location: string, replaceUrl?: boolean | undefined, setFilter?: string | undefined): void {
    if( replaceUrl == true ) {
      this.router.navigate([location], { replaceUrl: true});
    }
    else {
      this.router.navigate([location]);
    }

    if (typeof setFilter === 'undefined') {
      this.currentFilter.next('');
      console.log('undefined');
    }
    else {
      this.currentFilter.next(setFilter);
      console.log(setFilter);
    }
    
  }

  loadBuildingImage(building: Building): string {
    // Gebäude existiert und das Bildattribut nicht null
    if (building && building.image) {
      // Gib den vollständigen Pfad zurück
      return `../../assets/hsb/assets/${building.image}`;
    } else {
      // Handle den Fall, wenn das Bild nicht gefunden wird
      console.error('Bild nicht gefunden');
      return ''; // oder einen Standardpfad oder eine leere Zeichenfolge zurückgeben
    }
  }

  goBack() {
    this.location.back();
  }

  updateURL(event: NavigationEnd) {
    const pathParam1 = event.url.split('/')[1];
    this.currentLocation.next(pathParam1);
    // for room and building id
    if(pathParam1 == 'view-room' && event.url.split('/')[2]) {
      const pathParam2 = event.url.split('/')[2];
      this.rooms.find(
        room => room.id == Number(pathParam2) ? this.updateCurrentRoom(room) : null
      );
    }
    if(pathParam1 == 'view-building' && event.url.split('/')[2]) {
      const pathParam2 = event.url.split('/')[2];
      this.buildings.find(
        building => building.id == Number(pathParam2) ? this.updateCurrentBuilding(building) : null
      );
    }

  }

  setCurrentFilter(value: string) {
    this.currentFilter.next(value);
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
      this.rooms = await lastValueFrom(this.roomService.getRooms());
      this.floors = await lastValueFrom(this.floorService.getFloors());
      this.buildings = await lastValueFrom(this.buildingService.getBuildings());
      this.getFavRooms();
      this.getFavBuildings();
      this.loadingComplete.next(true)
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

  async clearFaves() {
    this.rooms.forEach(room => {
      room.favorite == true ? room.favorite = false : null
    });
    this.cookie.set('favorite-rooms', '/');
    this.roomsChanged.next(!this.roomsChanged.value);


    this.buildings.forEach(building => {
      building.favorite == true ? building.favorite = false : null
    });
    this.cookie.set('favorite-buildings', '/');
    this.buildingsChanged.next(!this.buildingsChanged.value);
  }

}

//Converts String[] to Number[]
/*
    const favdIdsAsNumber: Number[] = favIdsAsString.map(function(item) {
      return Number(item)
    })

*/
