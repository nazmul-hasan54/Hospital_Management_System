import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facilities } from '../models/facilities';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  constructor(private http: HttpClient) { }
  getFacility(): Observable<Facilities[]> {
    return this.http.get<Facilities[]>(`http://localhost:29498/api/Facilities`);
  }
  getFacilityId(id: number): Observable<Facilities> {
    return this.http.get<Facilities>(`http://localhost:29498/api/Facilities/${id}`);
  }
 
  insertFacility(data: Facilities): Observable<Facilities> {
    return this.http.post<Facilities>(`http://localhost:29498/api/Facilities`, data);
  }
  updateFacility(data: Facilities): Observable<any> {
    return this.http.put(`http://localhost:29498/api/Facilities/${data.facilitiesId}`, data);
  }
  deleteFacility(id: number): Observable<any> {
    return this.http.delete<Facilities>(`http://localhost:29498/api/Facilities/${id}`);
  }
}
