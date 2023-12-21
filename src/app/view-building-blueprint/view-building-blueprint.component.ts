import {Component, ElementRef, ViewChild} from '@angular/core';
import {Building} from "../building";
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-view-building-blueprint',
  templateUrl: './view-building-blueprint.component.html',
  styleUrl: './view-building-blueprint.component.scss'
})
export class ViewBuildingBlueprintComponent {
  constructor(
    private sharedService: SharedService,
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

  currentRoomBuilding: Building = this.sharedService.defaultBuilding;
  currentRoomBuildingFloors: any[] = [];
  floorName: string = 'EG';
  scrollToggle: boolean = false;

  @ViewChild('toggleButtons') toggleButtons: ElementRef | undefined;

  async ngOnInit() {
    this.sharedService.currentBuilding.subscribe( currentBuilding => this.currentBuilding = currentBuilding);
    this.sharedService.buildingsChanged.subscribe( buildingsChanged => this.sharedService.updateCurrentBuildingById(this.currentBuilding.id));
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
  

  navigate(location: string) {
    this.sharedService.navigate(location);
    this.sharedService.setCurrentFilter(this.currentBuilding.name);
  }
}
