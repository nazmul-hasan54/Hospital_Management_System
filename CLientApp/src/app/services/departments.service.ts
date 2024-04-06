import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departments } from '../models/departments';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient) { }
  getDepartment(): Observable<Departments[]> {
    return this.http.get<Departments[]>("http://localhost:29498/api/Departments")
  }
  getDepartmentById(id: number): Observable<Departments> {
    return this.http.get<Departments>(`http://localhost:29498/api/Departments/${id}`)
  }
  insertDepartment(data: Departments): Observable<Departments[]> {
    return this.http.post<Departments[]>(`http://localhost:29498/api/Departments`, data);
  }
  updateDepartment(data: Departments): Observable<any> {
    return this.http.put(`http://localhost:29498/api/Departments/${data.departmentId}`, data);
  }
  DeleteDepartment(id: number): Observable<any> {
    return this.http.delete(`http://localhost:29498/api/Departments/${id}`);
  }
}
