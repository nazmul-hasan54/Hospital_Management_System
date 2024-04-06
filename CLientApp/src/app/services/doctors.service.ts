import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctors } from '../models/doctors';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private http: HttpClient) { }
  getDoctors(): Observable<Doctors[]> {
    return this.http.get<Doctors[]>(`http://localhost:29498/api/Doctors`)

  }
  getDoctorsById(id: number): Observable<Doctors> {
    return this.http.get<Doctors>(`http://localhost:29498/api/Doctors/${id}`)
  }
  insertDoctor(data: Doctors): Observable<Doctors> {
    return this.http.post<Doctors>(`http://localhost:29498/api/Doctors`, data)
  }
  updateDoctor(data: Doctors): Observable<Doctors> {
    return this.http.put<Doctors>(`http://localhost:29498/api/Doctors/${data.doctorsId}`, data)
  }
  deleteDoctor(id: number): Observable<Doctors> {
    return this.http.delete<Doctors>(`http://localhost:29498/api/Doctors/${id}`)
  }
}
