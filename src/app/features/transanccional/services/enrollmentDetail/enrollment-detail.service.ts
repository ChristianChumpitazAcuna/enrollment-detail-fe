import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnrollmentDetail } from '../../interfaces/enrollmentDetail';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentDetailService {
  private baseUrl = 'http://34.118.235.124:8090/enrollment-detail';

  constructor(private http: HttpClient) {}

  getData(state: string): Observable<EnrollmentDetail[]> {
    return this.http.get<EnrollmentDetail[]>(`${this.baseUrl}/list/${state}`);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, data);
  }

  updateData(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, data);
  }

  deleteData(id: string): Observable<EnrollmentDetail> {
    return this.http.put<EnrollmentDetail>(
      `${this.baseUrl}/deactivate/${id}`,
      {}
    );
  }

  restoreData(id: string): Observable<EnrollmentDetail> {
    return this.http.put<EnrollmentDetail>(
      `${this.baseUrl}/activate/${id}`,
      {}
    );
  }
}
