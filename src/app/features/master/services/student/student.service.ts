import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Student } from '../../interfaces/student/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://34.118.228.223:8080/student'; 

  constructor(private http: HttpClient) { }

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/create`, student);
  }

  update(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/update/${id}`, student);
  }

  activate(id: string): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/activate/${id}`, {});
  }

  deactivate(id: string): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/inactive/${id}`, {});
  }

  getStudentsA(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/list/active`).pipe(
      map(students => {
        return students.sort((a, b) => a.lastNamePaternal.localeCompare(b.lastNamePaternal));
      })
    );
  }

  getStudentsI(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/list/inactive`).pipe(
      map(students => {
        return students.sort((a, b) => a.lastNamePaternal.localeCompare(b.lastNamePaternal));
      })
    );
  }
}