import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestList } from '../models/test-list';

@Injectable({
  providedIn: 'root'
})
export class TestListService {

  constructor(private http: HttpClient) { }
  getTestList(): Observable<TestList[]> {
    return this.http.get<TestList[]>(`http://localhost:29498/api/Testlists`)
  }
  getTestListById(id: number): Observable<TestList> {
    return this.http.get<TestList>(`http://localhost:29498/api/Testlists/${id}`)
  }
  insertTestList(data: TestList): Observable<TestList> {
    return this.http.post<TestList>(`http://localhost:29498/api/Testlists`, data)
  }
  updateTestList(data: TestList): Observable<TestList> {
    return this.http.put<TestList>(`http://localhost:29498/api/Testlists/${data.testlistId}`, data)
  }
  deleteTestList(id: number): Observable<TestList> {
    return this.http.delete<TestList>(`http://localhost:29498/api/Testlists/${id}`)
  }

}
