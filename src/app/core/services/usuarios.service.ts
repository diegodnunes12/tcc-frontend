import { TipoUsuarioInterface } from './../interfaces/tipo-usuario.interface';
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

  public getTiposUsuarios(): Observable<TipoUsuarioInterface[]> {
    return this.http.get<TipoUsuarioInterface[]>(`${this.url}/tipos-usuarios`);
  }

  /** USUÁRIOS ONG **/

  public loginAdmin(usuario: UsuarioLoginInterface): Observable<TokenInterface> {
    return this.http.post<TokenInterface>(`${this.url}/usuarios-ong/login`, usuario);
  }

  public cadastrarUsuarioAdmin(usuario: UsuarioInterface): Observable<UsuarioInterface> {
    return this.http.post<UsuarioInterface>(`${this.url}/usuarios-ong`, usuario);
  }

  public getUsuariosOng(ongId: string): Observable<UsuarioInterface[]> {
    return this.http.get<UsuarioInterface[]>(`${this.url}/usuarios-ong/ong/${ongId}`);
  }

  public getUsuariosOngPeloId(id: string): Observable<UsuarioInterface> {
    return this.http.get<UsuarioInterface>(`${this.url}/usuarios-ong/${id}`);
  }

  public alterarUsuarioOng(id: string, usuarioOng: UsuarioInterface) {
    return this.http.patch(`${this.url}/usuarios-ong/${id}`, usuarioOng);
  }

  public deleteUsuarioOng(id: string) {
    return this.http.delete(`${this.url}/usuarios-ong/${id}`);
  }

  /** USUÁRIOS SISTEMA **/

  public loginSistema(usuario: UsuarioLoginInterface): Observable<TokenInterface> {
    return this.http.post<TokenInterface>(`${this.url}/usuarios-sistema/login`, usuario);
  }

  public cadastrarUsuarioSistema(usuario: UsuarioInterface): Observable<UsuarioInterface> {
    return this.http.post<UsuarioInterface>(`${this.url}/usuarios-sistema`, usuario);
  }

}
