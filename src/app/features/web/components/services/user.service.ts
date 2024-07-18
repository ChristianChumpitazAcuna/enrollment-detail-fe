import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContacUser } from './../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUser = 'https://8080-vallegrande-vgmscontact-szt4f6vdk3v.ws-us114.gitpod.io/api/users';

  constructor(private http: HttpClient) { }

  getActiveUsers(): Observable<ContacUser[]> {
    return this.http.get<ContacUser[]>(`${this.apiUser}/active`);
  }

  postData(user: ContacUser): Observable<Object> {
    return this.http.post(this.apiUser, user);
  }


  actualizarUser(id: string, student: ContacUser): Observable<ContacUser> {
    return this.http.put<ContacUser>(`${this.apiUser}/${id}`, student);
  }

  obtenerUserPorId(id: string): Observable<ContacUser> {
    return this.http.get<ContacUser>(`${this.apiUser}/${id}`);
  }

  eliminarUser(id: string): Observable<Object> {
    // Aquí realizamos el eliminado lógico, cambiando el estado del usuario a inactivo
    return this.http.delete(`${this.apiUser}/${id}`);
  }

  activarUser(id: string): Observable<Object> {
    return this.http.put(`${this.apiUser}/reactivate/${id}`, {});
  }
  restoreUser(id: string): Observable<Object> {
    return this.http.put(`${this.apiUser}/reactivate/${id}`, {});
  }

  deletePermanently(id: string): Observable<Object> {
    return this.http.delete(`${this.apiUser}/fisico/${id}`);
  }

  getInactivos(): Observable<ContacUser[]> {
    return this.http.get<ContacUser[]>(`${this.apiUser}/inactive`);
  }

  obtenerUserPorCelular(celular: string): Observable<ContacUser> {
    return this.http.get<ContacUser>(`${this.apiUser}/buscarPorCelular/${celular}`);
  }
  crearUsuario(user: ContacUser): Observable<ContacUser> {
    return this.http.post<ContacUser>(this.apiUser, user);
  }
  obtenerUserPorDocumento(documentNumber: string): Observable<ContacUser> {
    return this.http.get<ContacUser>(`${this.apiUser}/buscarPorDocumento/${documentNumber}`);
  }

  
}
