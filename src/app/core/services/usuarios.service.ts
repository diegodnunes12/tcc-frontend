import { UsuarioLoginInterface } from './../interfaces/usuario-login.interface';
import { UsuarioInterface } from './../interfaces/usuarios.interface';
import { Observable } from 'rxjs';
import { EspecieInterface } from '../interfaces/especie.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url: string = "https://adotejaapi.herokuapp.com/usuarios";

  constructor(private http: HttpClient) { }

  public loginSistema(usuario: UsuarioLoginInterface): Observable<UsuarioInterface> {
    return this.http.post<UsuarioInterface>(`${this.url}/sistema`, usuario);
  }

  public loginAdmin(usuario: UsuarioLoginInterface): Observable<UsuarioInterface> {
    return this.http.post<UsuarioInterface>(`${this.url}/sistema-admin`, usuario);
  }
}
