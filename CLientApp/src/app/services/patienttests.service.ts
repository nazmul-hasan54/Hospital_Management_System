import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patienttests } from '../models/patienttests';

@Injectable({
  providedIn: 'root'
})
export class PatienttestsService {

  constructor(private _http: HttpClient) { }

  getPatientTests(): Observable<Patienttests[]>{
    return this._http.get<Patienttests[]>(`http://localhost:29498/api/PatientTests`);
  }

  getPatientTestById(id: number): Observable<Patienttests>{
    return this._http.get<Patienttests>(`http://localhost:29498/api/PatientTests/${id}`);
  }
}
