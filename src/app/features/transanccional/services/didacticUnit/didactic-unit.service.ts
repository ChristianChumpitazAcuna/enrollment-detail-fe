import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DidacticUnitService {
  private baseUrl = 'http://34.118.231.24:8089/didactic-unit';

  constructor(private http: HttpClient) {}

  getData(state: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list/${state}`);
  }
}
