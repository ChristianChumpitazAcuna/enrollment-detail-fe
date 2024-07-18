import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiReniecService {

  private apiUrl = 'https://api.perudevs.com/api/v1/dni/complete';
  private apiKey = 'cGVydWRldnMucHJvZHVjdGlvbi5maXRjb2RlcnMuNjY3ZWYxYWNkNDFiOTQxMTE0OGI1ODll'; 

  constructor(private http: HttpClient) { }

  completeDniData(documentNumber: string): Observable<any> {
    const url = `${this.apiUrl}?document=${documentNumber}&key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
