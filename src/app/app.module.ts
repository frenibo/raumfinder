import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { StartmenuComponent } from './startmenu/startmenu.component';
import { ViewRoomComponent } from './view-room/view-room.component';
import { ListRoomComponent } from './list-room/list-room.component';
import { SettingsComponent } from './settings/settings.component';
import { FavoriteRoomComponent } from './favorite-room/favorite-room.component';
import { FavoriteBuildingComponent } from './favorite-building/favorite-building.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ListBuildingComponent } from './list-building/list-building.component';
import { ViewBuildingComponent } from './view-building/view-building.component';
import { ViewBuildingBlueprintComponent } from './view-building-blueprint/view-building-blueprint.component';
import { DialogInfoBuildingComponent } from './dialogs/dialog-info-building/dialog-info-building.component';
import { ListFreeRoomsComponent } from './list-free-rooms/list-free-rooms.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './in-memory-data.service';


import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CookieService } from 'ngx-cookie-service';

import { AutofocusDirective } from './autofocus.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { PinchZoomComponent, PinchZoomModule } from '@meddv/ngx-pinch-zoom';
import {MatSelectModule} from '@angular/material/select';
import { UnlockRoomsComponent } from './unlock-rooms/unlock-rooms.component';
import { MatChipsModule } from '@angular/material/chips';
import { AsyncPipe } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
        StartmenuComponent,
        ViewRoomComponent,
        ListRoomComponent,
        ListBuildingComponent,
        ViewBuildingComponent,
        FavoriteRoomComponent,
        FavoriteBuildingComponent,
        FavoritesComponent,
        AutofocusDirective,
        ViewBuildingBlueprintComponent,
        DialogInfoBuildingComponent,
        ListFreeRoomsComponent,
        SettingsComponent,
        UnlockRoomsComponent,
    ],
    providers: [
        CookieService,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        HttpClientInMemoryWebApiModule,
        MatTableModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, { dataEncapsulation: false }
        ),
        MatButtonToggleModule,
        MatDialogModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMatTimepickerModule,
        PinchZoomModule,
        MatSelectModule,
        MatChipsModule,
        FormsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        AsyncPipe,
    ]
})
export class AppModule { }
