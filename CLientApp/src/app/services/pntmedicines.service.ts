import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pntmedicines } from '../models/pntmedicines';

@Injectable({
  providedIn: 'root'
})
export class PntmedicinesService {

  constructor(private _http: HttpClient) { }

  getPntMedicines(): Observable<Pntmedicines[]>{
    return this._http.get<Pntmedicines[]>(`http://localhost:29498/api/PntMedicines`);
  }

  getPntMedicineById(id: number): Observable<Pntmedicines>{
    return this._http.get<Pntmedicines>(`http://localhost:29498/api/PntMedicines/${id}`);
  }
 
}
