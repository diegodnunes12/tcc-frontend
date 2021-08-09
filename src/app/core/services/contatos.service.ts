import { ContatosInterface } from './../interfaces/contatos.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  private url: string = "https://adotejaapi.herokuapp.com/contatos";

  constructor(private http: HttpClient) { }

  public cadastrar(contato: ContatosInterface): Observable<ContatosInterface> {
    return this.http.post<ContatosInterface>(this.url, contato);
  }

  public getContatos(usuarioId: string): Observable<ContatosInterface[]> {
    return this.http.get<ContatosInterface[]>(`${this.url}/usuario/${usuarioId}`);
  }

  public getContatosOng(ongId: string): Observable<ContatosInterface[]> {
    return this.http.get<ContatosInterface[]>(`${this.url}/ong/${ongId}`);
  }

  public getContato(contatoId: string): Observable<ContatosInterface> {
    return this.http.get<ContatosInterface>(`${this.url}/${contatoId}`);
  }
}
