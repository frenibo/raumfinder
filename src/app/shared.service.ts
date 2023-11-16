import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, async, lastValueFrom } from 'rxjs';
import { Room } from './room';
import { RoomService } from './room.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ParamMap, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  
      // Constructor
  constructor(
    private roomService: RoomService,
    public router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  filterValue: Subject<string> = new Subject();

  listViewSort: Subject<MatSortable> = new Subject();
  externalSort: Subject<MatSortable> = new Subject();

  locations: string[] = [];

  getUrl(): Params {
    var urlString = this.router.routerState.snapshot.url;
    var url: Params = {
      view: urlString.split('/')[1],
      id: urlString.split('/')[2],
      edit: urlString.split('/')[3],
    }
    return url
  }


  applyFilter(event?: Event): void {
    if(event){
      this.filterValue.next((event.target as HTMLInputElement).value.trim().toLowerCase());
    }
    //if applyFilter() is called without an event, the filter simply resets to no filter.
    else {
      this.filterValue.next("");
    }
  }

  updateListViewSort(sort: MatSortable) {
    this.listViewSort.next(sort);
  }
  updateExternalSort(sort: MatSortable) {
    this.externalSort.next(sort);
  }

}
