import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OutPtPresccripts } from '../models/out-pt-presccripts';

@Injectable({
  providedIn: 'root'
})
export class OutPtPresccriptsService {

  constructor(private http: HttpClient) { }
  getOutPtPresccripts(): Observable<OutPtPresccripts[]> {
    return this.http.get<OutPtPresccripts[]>(`http://localhost:29498/api/OutptPresccripts`);
  }
  getOutPtPresccriptsById(id: number): Observable<OutPtPresccripts> {
    return this.http.get<OutPtPresccripts>(`http://localhost:29498/api/OutptPresccripts/${id}`);
  }
  insertOutPtPresccript(data: OutPtPresccripts): Observable<OutPtPresccripts> {
    return this.http.post<OutPtPresccripts>(`http://localhost:29498/api/OutptPresccripts`, data);
  }
  updateOutPtPresccript(data: OutPtPresccripts): Observable<OutPtPresccripts> {
    console.log(data.outptPresccriptId);
    return this.http.put<OutPtPresccripts>(`http://localhost:29498/api/OutptPresccripts/${data.outptPresccriptId}`, data);
   
  }
  deleteOutPtPresccript(id: number): Observable<OutPtPresccripts> {
    return this.http.delete<OutPtPresccripts>(`http://localhost:29498/api/OutptPresccripts/${id}`);
  }
}
