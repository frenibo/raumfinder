import {Component, ElementRef, ViewChild} from '@angular/core';
import {Building} from "../building";
import { SharedService } from '../shared.service';
import {Room} from "../room";
import {lastValueFrom} from "rxjs";
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-view-building-blueprint',
  templateUrl: './view-building-blueprint.component.html',
  styleUrl: './view-building-blueprint.component.scss'
})
export class ViewBuildingBlueprintComponent {
  constructor(
    private sharedService: SharedService,
    private dialogService: DialogService,
  ) {}

  currentBuilding: Building = {
    id: 0,
    name: 'noname',
    street: 'Flughafenallee',
    street_number: '10',
    ort: 'Bremen',
    plz: 28199,
    country: 'Deutschland',
    image: 'default.jpg',
    floor_ids: [1,2,3],
    room_ids: [1,2],
    favorite: false,
  };

  currentBuildingFloors: any[] = [];
  floorName: string = 'EG';
  scrollToggle: boolean = false;

  @ViewChild('toggleButtons') toggleButtons: ElementRef | undefined;

  async ngOnInit() {
    this.sharedService.currentBuilding.subscribe( currentBuilding => this.getData(currentBuilding));
    this.sharedService.currentBuilding.subscribe( currentBuilding => this.currentBuilding = currentBuilding);
    this.sharedService.buildingsChanged.subscribe( buildingsChanged => this.sharedService.updateCurrentBuildingById(this.currentBuilding.id));
  }

  openDialogInfoBuilding() {
    this.dialogService.openDialogInfoBuilding();
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


  navigate(location: string, replaceUrl?: boolean | undefined, setFilter?: string | undefined) {
    this.sharedService.navigate(location, replaceUrl, setFilter);
  }

  navigateWithBuilding(location: string, building: Building, replaceUrl?: boolean | undefined) {
    const path: string = location.concat('/' + String(building.id));
    this.sharedService.navigate(path, replaceUrl);
    this.sharedService.updateCurrentBuilding(building);
  }

  async getData(building: Building) {
    this.currentBuilding = building;
    if(this.currentBuilding.floor_ids) {
      this.currentBuildingFloors = [];
      for(let i = 0; i < this.currentBuilding.floor_ids.length; i++) {
        this.sharedService.floors.forEach( floor => {
          floor.id == this.currentBuilding.floor_ids[i] ? this.currentBuildingFloors.push(floor) : null
        });
      }
    }
    this.floorName = "EG";
  }

}
