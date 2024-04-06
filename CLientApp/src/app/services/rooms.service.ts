import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rooms } from '../models/rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) { }
  getRooms(): Observable<Rooms[]> {
    return this.http.get<Rooms[]>(`http://localhost:29498/api/Rooms`);
  }
  getRoomId(id: number): Observable<Rooms> {
    return this.http.get<Rooms>(`http://localhost:29498/api/Rooms/${id}`);
  }
  insertRoom(data: Rooms): Observable<Rooms> {
    return this.http.post<Rooms>(`http://localhost:29498/api/Rooms`, data);
  }
  updateRoom(data: Rooms): Observable<any> {
    return this.http.put(`http://localhost:29498/api/Rooms/${data.roomId}`, data);
  }
  deleteRoom(id: number): Observable<any> {
    return this.http.delete<Rooms>(`http://localhost:29498/api/Rooms/${id}`);
  }

}
