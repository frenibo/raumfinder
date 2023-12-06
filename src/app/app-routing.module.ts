import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoaderComponent } from './loader/loader.component';
import { StartmenuComponent } from './startmenu/startmenu.component';
import { ViewRoomComponent } from './view-room/view-room.component';
import { ViewBuildingComponent } from './view-building/view-building.component';
import { ListRoomComponent } from './list-room/list-room.component';
import { ListBuildingComponent } from './list-building/list-building.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  { path: '', redirectTo: 'loading', pathMatch: 'full' },
  { path: 'loading', component: LoaderComponent },
  { path: 'startmenu', component: StartmenuComponent },
  { path: 'list-room', component: ListRoomComponent },
  { path: 'view-room', component: ViewRoomComponent },
  { path: 'view-room/:id', component: ViewRoomComponent },
  { path: 'list-building', component: ListBuildingComponent },
  { path: 'view-building', component: ViewBuildingComponent },
  { path: 'view-building/:id', component: ViewBuildingComponent },
  { path: 'favorites', component: FavoritesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
