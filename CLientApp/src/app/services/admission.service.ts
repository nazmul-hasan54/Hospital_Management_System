import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admission } from '../models/admission';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {


  constructor(private http: HttpClient) { }
  getAdmission(): Observable<Admission[]> {
    return this.http.get<Admission[]>(`http://localhost:29498/api/Admissions`)
  }
  getAdmissionById(id: number): Observable<Admission> {
    return this.http.get<Admission>(`http://localhost:29498/api/Admissions/${id}`)
  }
  insertAdmission(data: Admission): Observable<Admission> {
    return this.http.post<Admission>(`http://localhost:29498/api/Admissions`, data);
  }
  updateAdmission(data: Admission): Observable<Admission> {
    return this.http.put<Admission>(`http://localhost:29498/api/Admissions/${data.admissionId}`, data);
  }
  deleteAdmission(id: number): Observable<Admission> {
    return this.http.delete<Admission>(`http://localhost:29498/api/Admissions/${id}`);
  }
}
