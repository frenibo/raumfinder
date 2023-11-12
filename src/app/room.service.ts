import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from './room'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  private roomsUrl = 'api/rooms';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET Rooms from the server */
  getRooms(): Observable<Room[]> { 
    return this.http.get<Room[]>(this.roomsUrl)
  }

  /** GET Room by id. Will 404 if id not found */
  getRoom(id: number): Observable<Room> {
    const url = `${this.roomsUrl}/${id}`;
    return this.http.get<Room>(url)
  }

    /** PUT: update the Room on the server */
  updateRoom(room: Room): Observable<any> {
    return this.http.put(this.roomsUrl, room, this.httpOptions)
  }

  /** POST: add a new room to the server */
  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.roomsUrl, room, this.httpOptions)
  }

  /** DELETE: delete the room from the server */
  deleteRoom(id: number): Observable<Room> {
    const url = `${this.roomsUrl}/${id}`
    return this.http.delete<Room>(url, this.httpOptions)
  }

  /* GET topologies whose name contains search term */
  searchRooms(term: string): Observable<Room[]> {
    if (!term.trim()) {
      // if not search term, return empty room array.
      return of([]);
    }
    return this.http.get<Room[]>(`${this.roomsUrl}/?name=${term}`)
  }
}
