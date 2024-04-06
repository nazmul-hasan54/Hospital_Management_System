import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beds } from '../models/beds';

@Injectable({
  providedIn: 'root'
})
export class BedsService {

  constructor(private http: HttpClient) { }
  getBeds(): Observable<Beds[]> {
    return this.http.get<Beds[]>(`http://localhost:29498/api/Beds`);
  }
  getBedById(id: number): Observable<Beds> {
    return this.http.get<Beds>(`http://localhost:29498/api/Beds/${id}`);
  }
  insertBed(data: Beds): Observable<Beds> {
    return this.http.post<Beds>(`http://localhost:29498/api/Beds`, data);
  }
  updateBed(data: Beds): Observable<any> {
    return this.http.put(`http://localhost:29498/api/Beds/${data.bedId}`, data);
  }
  deleteBed(id: number): Observable<any> {
    return this.http.delete<Beds>(`http://localhost:29498/api/Beds/${id}`);
  }
}
