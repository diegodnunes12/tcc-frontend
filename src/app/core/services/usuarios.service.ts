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

  public getUsuarioOngPorEmail(email: string) {
    return this.http.get(`${this.url}/usuarios-ong/email/${email}`);
  }

  public enviarEmailUsuarioAdmin(email: string) {
    return this.http.post(`${this.url}/usuarios-ong/recuperar-senha/${email}`, {});
  }

  public verificarSenhaAdmin(email: string, senha: string) {
    return this.http.post(`${this.url}/usuarios-ong/verifica-senha`, { email, senha });
  }

  /** USUÁRIOS SISTEMA **/

  public loginSistema(usuario: UsuarioLoginInterface): Observable<TokenInterface> {
    return this.http.post<TokenInterface>(`${this.url}/usuarios-sistema/login`, usuario);
  }

  public cadastrarUsuarioSistema(usuario: UsuarioInterface): Observable<UsuarioInterface> {
    return this.http.post<UsuarioInterface>(`${this.url}/usuarios-sistema`, usuario);
  }

  public getUsuariosSistemaPeloId(id: string): Observable<UsuarioInterface> {
    return this.http.get<UsuarioInterface>(`${this.url}/usuarios-sistema/${id}`);
  }

  public alterarUsuarioSistema(id: string, usuarioSistema: UsuarioInterface) {
    return this.http.patch(`${this.url}/usuarios-sistema/${id}`, usuarioSistema);
  }

  public getUsuarioSistemaPorEmail(email: string) {
    return this.http.get(`${this.url}/usuarios-sistema/email/${email}`);
  }

  public enviarEmailUsuario(email: string) {
    return this.http.post(`${this.url}/usuarios-sistema/recuperar-senha/${email}`, {});
  }

  public verificarSenha(email: string, senha: string) {
    return this.http.post(`${this.url}/usuarios-sistema/verifica-senha`, { email, senha });
  }

}
