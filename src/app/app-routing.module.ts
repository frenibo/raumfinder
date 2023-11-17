import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoaderComponent } from './loader/loader.component';
import { RoomTableComponent } from './room-table/room-table.component';
import { BuildingTableComponent } from './building-table/building-table.component';
import { StartmenuComponent } from './startmenu/startmenu.component';
import { ViewRoomComponent } from './view-room/view-room.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'startmenu', component: StartmenuComponent },
  { path: 'room-table', component: RoomTableComponent },
  { path: 'building-table', component: BuildingTableComponent },
  { path: 'view-room', component: ViewRoomComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
