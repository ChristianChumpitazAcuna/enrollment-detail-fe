import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudyProgramme } from './../interfaces/study-programme';

@Injectable({
  providedIn: 'root'
})


export class StudyProgrammeService {
  private apiStudyProgramme = 'http://localhost:8080/study-programme';

  constructor(private http: HttpClient) { }

  getActiveStudyProgramme(): Observable<StudyProgramme[]> {
    return this.http.get<StudyProgramme[]>(`${this.apiStudyProgramme}/list/active`);
  }

  postData(programme: StudyProgramme): Observable<Object> {
    return this.http.post(this.apiStudyProgramme, programme);
  }

  updateStudyProgramme(id: string, programme: StudyProgramme): Observable<Object> {
    return this.http.put(`${this.apiStudyProgramme}/${id}`, programme);
  }

  getStudyProgrammeById(id: string): Observable<StudyProgramme> {
    return this.http.get<StudyProgramme>(`${this.apiStudyProgramme}/${id}`);
  }

  deleteStudyProgramme(id: string): Observable<Object> {
    // Aquí realizamos el eliminado lógico, cambiando el estado del usuario a inactivo
    return this.http.delete(`${this.apiStudyProgramme}/${id}`);
  }

  activateStudyProgramme(id: string): Observable<Object> {
    return this.http.put(`${this.apiStudyProgramme}/reactivate/${id}`, {});
  }

  deletePermanently(id: string): Observable<Object> {
    return this.http.delete(`${this.apiStudyProgramme}/fisico/${id}`);
  }

  getInactiveStudyProgramme(): Observable<StudyProgramme[]> {
    return this.http.get<StudyProgramme[]>(`${this.apiStudyProgramme}/list/inactive`);
  }

  getProgrammeByPhone(phone: string): Observable<StudyProgramme> {
    return this.http.get<StudyProgramme>(`${this.apiStudyProgramme}/buscarPorCelular/${phone}`);
  }

  createProgramme(StudyProgramme: StudyProgramme): Observable<StudyProgramme> {
    return this.http.post<StudyProgramme>(this.apiStudyProgramme, StudyProgramme);
  }
}
