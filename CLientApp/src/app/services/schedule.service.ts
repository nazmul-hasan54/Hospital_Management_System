import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../models/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }
  getSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`http://localhost:29498/api/Schedules`);
  }
  getScheduleById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`http://localhost:29498/api/Schedules/${id}`);
  }

  deleteSchedule(id: number): Observable<Schedule> {
    return this.http.delete<Schedule>(`http://localhost:29498/api/Schedules/${id}`);
  }

  insertSchedule(data: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`http://localhost:29498/api/Schedules`, data);
  }
  updateSchedule(data: Schedule): Observable<any> {
    return this.http.put(`http://localhost:29498/api/Schedules/${data.scheduleId}`, data);
  }
}
