import { MensagemInterface } from './../interfaces/mensagem.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  private url: string = "https://adotejaapi.herokuapp.com/mensagens";
  //private url: string = "http://localhost:3000/mensagens";

  constructor(private http: HttpClient) { }

  public cadastrar(mensagem: MensagemInterface): Observable<MensagemInterface> {
    return this.http.post<MensagemInterface>(this.url, mensagem);
  }

  public getByContato(contatoId: string): Observable<MensagemInterface[]> {
    return this.http.get<MensagemInterface[]>(`${this.url}/contato/${contatoId}`);
  }

  public alterarTexto(texto: string, mensagemId: string): Observable<MensagemInterface> {
    return this.http.patch<MensagemInterface>(`${this.url}/${mensagemId}`, { texto });
  }

  public delete(mensagemId: string): Observable<MensagemInterface> {
    return this.http.delete<MensagemInterface>(`${this.url}/${mensagemId}`);
  }

}
