import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicinelists } from '../models/medicinelists';

@Injectable({
  providedIn: 'root'
})
export class MedicinelistsService {

  constructor(private http: HttpClient) { }
  getMedicine(): Observable<Medicinelists[]> {
    return this.http.get<Medicinelists[]>(`http://localhost:29498/api/MedicineLists`);
  }
  getMedicineById(id: number): Observable<Medicinelists> {
    return this.http.get<Medicinelists>(`http://localhost:29498/api/MedicineLists/${id}`);
  }
  deleteMedicine(id: number): Observable<any> {
    return this.http.delete<Medicinelists>(`http://localhost:29498/api/MedicineLists/${id}`);
  }
  insertMedicine(data: Medicinelists): Observable<Medicinelists> {
    return this.http.post<Medicinelists>(`http://localhost:29498/api/MedicineLists`, data);
  }
  updateMedicine(data: Medicinelists): Observable<any> {
    return this.http.put(`http://localhost:29498/api/MedicineLists/${data.medicineListId}`, data);
  }

}
