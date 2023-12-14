import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Building } from './building'
import { Observable, Subject, lastValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private http: HttpClient) { }

  private buildingsUrl = 'api/buildings';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET Rooms from the server */
  getBuildings(): Observable<Building[]> { 
    //return this.http.get<Room[]>(this.roomsUrl)
    return this.http.get<Building[]>(this.buildingsUrl)
  }

  /** GET Room by id. Will 404 if id not found */
  getBuilding(id: number): Observable<Building> {
    const url = `${this.buildingsUrl}/${id}`;
    return this.http.get<Building>(url)
  }

    /** PUT: update the Room on the server */
  updateBuildings(building: Building): Observable<any> {
    return this.http.put(this.buildingsUrl, building, this.httpOptions)
  }

  /** POST: add a new room to the server */
  addBuildings(building: Building): Observable<Building> {
    return this.http.post<Building>(this.buildingsUrl, building, this.httpOptions)
  }

  /** DELETE: delete the room from the server */
  deleteBuildings(id: number): Observable<Building> {
    const url = `${this.buildingsUrl}/${id}`
    return this.http.delete<Building>(url, this.httpOptions)
  }

  /* GET topologies whose name contains search term */
  searchBuildings(term: string): Observable<Building[]> {
    if (!term.trim()) {
      // if not search term, return empty room array.
      return of([]);
    }
    return this.http.get<Building[]>(`${this.buildingsUrl}/?name=${term}`)
  }

}
