import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ubigeo } from '../../interfaces/student/ubigeo';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {
  private apiUrl = 'http://localhost:8080/ubigeo'; 

  constructor(private http: HttpClient) { }

  create(ubigeo: Ubigeo): Observable<Ubigeo> {
    return this.http.post<Ubigeo>(`${this.apiUrl}/create`, ubigeo);
  }

  update(id: string, ubigeo: Ubigeo): Observable<Ubigeo> {
    return this.http.put<Ubigeo>(`${this.apiUrl}/update/${id}`, ubigeo);
  }

  getAll(): Observable<Ubigeo[]> {
    return this.http.get<Ubigeo[]>(`${this.apiUrl}/list`);
  }
  
}
