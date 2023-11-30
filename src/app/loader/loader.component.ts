import { Component } from '@angular/core';
import { NavigationEnd, Router, UrlSegment } from '@angular/router';

import { Room } from '../room';
import { RoomService } from '../room.service';
import { Floor } from '../floor';
import { FloorService } from '../floor.service';
import { Building } from '../building';
import { BuildingService } from '../building.service';
import { SharedService } from '../shared.service';

import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  constructor(
    private roomService: RoomService,
    private floorService: FloorService,
    private buildingService: BuildingService,
    private sharedService: SharedService,
    private router: Router,
  ) {}

  rooms: Room[] = [];
  floors: Floor[] = [];
  buildings: Building[] = [];
  currentLocation: string = '';
  loadingComplete: boolean = false;
  loaderWidth: number = 100;
  loaderHidden: boolean = true;

  async ngOnInit() {

    this.sharedService.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.sharedService.updateURL(event);
        }
      }
    );

    this.sharedService.currentLocation.subscribe( currentLocation => this.currentLocation = currentLocation );
    this.sharedService.loadingComplete.subscribe( loadingComplete => this.loadingState(loadingComplete));
      
  }

  async loadingState(loadingComplete: boolean) {
    if(loadingComplete == true) {
      if(this.currentLocation === '' || this.currentLocation === 'loading') {
        this.sharedService.navigate('startmenu', true);
      }
      this.loadingComplete = true;
      this.hideLoader();
    }
    if(loadingComplete == false) {
      this.loadingComplete = false;
      this.sharedService.loadAllData();
    }
  }

  hideLoader() {
    this.loaderWidth = 0;
  }

}
