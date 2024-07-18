import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://www.universal-tutorial.com/api/';
  private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJnYWJyaWVsZ3V0aWVycmV6Z3E2NzFAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiZnNnNWVKZFFZNk85TlFzRkVsZ3JBM2ZwQ0hHdkpTMU80bHNkM2oyVEp5Zm5vQzN3aWFmLS0yVTFxbUFqajUtQ01NbyJ9LCJleHAiOjE3MTk4OTMxNTV9.95nGFaXziDlB4tP9kBDISp481EcVEAVP9QhX68pqfcs';

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de países
  getCountries(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`,
      'Accept': 'application/json'
    });

    return this.http.get(`${this.baseUrl}countries/`, { headers });
  }

  getCities(state: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`,
      'Accept': 'application/json'
    });

    return this.http.get(`${this.baseUrl}cities/${state}`, { headers });
  }
}
