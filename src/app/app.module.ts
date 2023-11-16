import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PracticeComponent } from './practice/practice.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        PracticeComponent,
        SearchbarComponent,
    ],
    providers: [],
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
    ]
})
export class AppModule { }
