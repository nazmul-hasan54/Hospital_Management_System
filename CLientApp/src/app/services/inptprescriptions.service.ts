import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inptprescriptions } from '../models/inptprescriptions';

@Injectable({
  providedIn: 'root'
})
export class InptprescriptionsService {

  constructor(private http: HttpClient) { }
  getPrescription(): Observable<Inptprescriptions[]> {
    return this.http.get<Inptprescriptions[]>(`http://localhost:29498/api/InPtPrescriptions`);
  }
  getPrescriptionById(id: number): Observable<Inptprescriptions> {
    return this.http.get<Inptprescriptions>(`http://localhost:29498/api/InPtPrescriptions/${id}`);
  }
  insertPrescription(data: Inptprescriptions): Observable<Inptprescriptions[]> {
    return this.http.post<Inptprescriptions[]>(`http://localhost:29498/api/InPtPrescriptions`, data);
  }
  updatePrescription(data: Inptprescriptions): Observable<Inptprescriptions> {
    return this.http.put<Inptprescriptions>(`http://localhost:29498/api/InPtPrescriptions/${data.inPtPrescriptionId}`, data);
  }
  deletePrescription(id: number): Observable<Inptprescriptions> {
    return this.http.delete<Inptprescriptions>(`http://localhost:29498/api/InPtPrescriptions/${id}`);
  }
}
