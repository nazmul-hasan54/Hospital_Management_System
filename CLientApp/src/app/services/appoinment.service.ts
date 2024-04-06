import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appoinment } from '../models/appoinment';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentService {

  constructor(private http: HttpClient) { }
  getAppoinments(): Observable<Appoinment[]> {
    return this.http.get<Appoinment[]>(`http://localhost:29498/api/Appoinments`);
  }
  getAppoinmentsById(id: number): Observable<Appoinment> {
    return this.http.get<Appoinment>(`http://localhost:29498/api/Appoinments/${id}`);
  }
  insertAppoinments(data: Appoinment): Observable<Appoinment> {
    return this.http.post<Appoinment>(`http://localhost:29498/api/Appoinments`, data);
  }
  updateAppoinments(data: Appoinment): Observable<Appoinment> {
    return this.http.put<Appoinment>(`http://localhost:29498/api/Appoinments/${data.appoinmentId}`, data);
  }
  deleteAppoinments(id: number): Observable<Appoinment> {
    return this.http.delete<Appoinment>(`http://localhost:29498/api/Appoinments/${id}`);
  }
}
