import { TokenInterface } from './../interfaces/token.interface';
import { UsuarioLoginInterface } from './../interfaces/usuario-login.interface';
import { UsuarioInterface } from './../interfaces/usuarios.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url: string = "https://adotejaapi.herokuapp.com";

  constructor(private http: HttpClient) { }

  public loginSistema(usuario: UsuarioLoginInterface): Observable<TokenInterface> {
    return this.http.post<TokenInterface>(`${this.url}/usuarios-sistema/login`, usuario);
  }

  public loginAdmin(usuario: UsuarioLoginInterface): Observable<TokenInterface> {
    return this.http.post<TokenInterface>(`${this.url}/usuarios-ong/login`, usuario);
  }

  public cadastrarUsuarioSistema(usuario: UsuarioInterface): Observable<UsuarioInterface> {
    return this.http.post<UsuarioInterface>(`${this.url}/usuarios-sistema`, usuario);
  }

  public cadastrarUsuarioAdmin(usuario: UsuarioInterface): Observable<UsuarioInterface> {
    return this.http.post<UsuarioInterface>(`${this.url}/usuarios-ong`, usuario);
  }

  public getUsuariosOng(ongId: string): Observable<UsuarioInterface[]> {
    return this.http.get<UsuarioInterface[]>(`${this.url}/usuarios-ong/ong/${ongId}`);
  }
}
