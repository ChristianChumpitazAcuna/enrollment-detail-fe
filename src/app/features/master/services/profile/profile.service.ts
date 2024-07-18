import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../../interfaces/profile/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:8080/profile';

  constructor(
    private http: HttpClient
  ) { }

  getData(state: string): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseUrl}/list/${state}`);
  }

  postData(data: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.baseUrl}/create`, data);
  }

  updateData(id: string, data: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseUrl}/update/${id}`, data);
  }

  deleteData(id: string): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseUrl}/deactivate/${id}`, {});
  }

  restoreData(id: string): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseUrl}/activate/${id}`, {});
  }
}
