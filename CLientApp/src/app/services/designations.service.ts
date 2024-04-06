import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Designations } from '../models/designations';

@Injectable({
  providedIn: 'root'
})
export class DesignationsService {

  constructor(private http: HttpClient) { }
 
  getDesignationList(): Observable<Designations[]> {
    return this.http.get<Designations[]>(`http://localhost:29498/api/Designations`)
  }
  getDesignationById(id: number): Observable<Designations> {
    return this.http.get<Designations>(`http://localhost:29498/api/Designations/${id}`)
  }
  insertDesignation(data: Designations): Observable<Designations> {
    return this.http.post<Designations>(`http://localhost:29498/api/Designations`, data)
  }
  updateDesignation(data: Designations): Observable<Designations> {
    return this.http.put<Designations>(`http://localhost:29498/api/Designations/${data.designationId}`, data)
  }
  deleteDesignation(id: number): Observable<Designations> {
    return this.http.delete<Designations>(`http://localhost:29498/api/Designations/${id}`)
  }
}
