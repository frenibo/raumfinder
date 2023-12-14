import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from './shared.service';
import { Room } from './room';
import { RoomService } from './room.service';
import { Floor } from './floor';
import { FloorService } from './floor.service';
import { Building } from './building';
import { BuildingService } from './building.service';
import { Observable, lastValueFrom } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ParamMap, Params, Router } from '@angular/router';

import { DialogInfoBuildingComponent } from './dialogs/dialog-info-building/dialog-info-building.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private roomService: RoomService,
    private floorService: FloorService,
    private buildingService: BuildingService,
    private sharedService: SharedService,
    public dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  async openDialogInfoBuilding(): Promise<any> {

    const dialogRef = this.dialog.open(DialogInfoBuildingComponent, {
      data: { 
        
      },
    });
    
    dialogRef.afterClosed().subscribe(result => {
    })

  }

  // Template für Übergabe von Daten an Dialog
  /* 

  async openDetailViewDialog(topology: Topology, owner: User): Promise<any> {

    //this.router.navigateByUrl(route['view'] + '/' + String(topology.id) + '/' + route['edit']);
    await this.sharedService.changeRoute(undefined, String(topology.id), undefined);
   
    const dialogRef = this.dialog.open(DetailViewComponent, {
      data: { 
        topology: topology,
        owner: owner,
      },
    });
    
    dialogRef.afterClosed().subscribe(result => {

      //this.router.navigateByUrl(route['view'] + '/0/' + route['edit']);
      this.sharedService.changeRoute(undefined, '0', undefined);
    })

  }

  */


}
