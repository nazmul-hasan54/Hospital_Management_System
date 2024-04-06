import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hospitals } from '../models/hospitals';

@Injectable({
  providedIn: 'root'
})
export class HospitalsService {

  constructor(private http: HttpClient) { }
  getHopital(): Observable<Hospitals[]> {
    return this.http.get<Hospitals[]>(`http://localhost:29498/api/Hospitals`);
  }
  getHospitalById(id: number): Observable<Hospitals> {
    return this.http.get<Hospitals>(`http://localhost:29498/api/Hospitals/${id}`);
  }
 
  insertHospital(data: Hospitals): Observable<Hospitals> {
    return this.http.post<Hospitals>(`http://localhost:29498/api/Hospitals`, data);
  }
  updateHospital(data: Hospitals): Observable<any> {
    return this.http.put(`http://localhost:29498/api/Hospitals/${data.hospitalId}`, data);
  }
  deleteHospital(id: number): Observable<any> {
    return this.http.delete<Hospitals>(`http://localhost:29498/api/Hospitals/${id}`);
  }
}
