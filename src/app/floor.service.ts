import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Floor } from './floor'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  constructor(private http: HttpClient) { }

  private floorsUrl = 'api/floors';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET Rooms from the server */
  getFloors(): Observable<Floor[]> { 
    return this.http.get<Floor[]>(this.floorsUrl)
  }

  /** GET Room by id. Will 404 if id not found */
  getFloor(id: number): Observable<Floor> {
    const url = `${this.floorsUrl}/${id}`;
    return this.http.get<Floor>(url)
  }

    /** PUT: update the floor on the server */
  updateFloor(floor: Floor): Observable<any> {
    return this.http.put(this.floorsUrl, floor, this.httpOptions)
  }

  /** POST: add a new floor to the server */
  addFloor(floor: Floor): Observable<Floor> {
    return this.http.post<Floor>(this.floorsUrl, floor, this.httpOptions)
  }

  /** DELETE: delete the floor from the server */
  deleteFloor(id: number): Observable<Floor> {
    const url = `${this.floorsUrl}/${id}`
    return this.http.delete<Floor>(url, this.httpOptions)
  }

  /* GET floors whose name contains search term */
  searchFloors(term: string): Observable<Floor[]> {
    if (!term.trim()) {
      // if not search term, return empty floor array.
      return of([]);
    }
    return this.http.get<Floor[]>(`${this.floorsUrl}/?name=${term}`)
  }
}
