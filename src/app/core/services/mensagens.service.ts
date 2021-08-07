import { MensagemInterface } from './../interfaces/mensagem.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenasgensService {

  private url: string = "https://adotejaapi.herokuapp.com/mensagens";

  constructor(private http: HttpClient) { }

  public cadastrar(mensagem: MensagemInterface): Observable<MensagemInterface> {
    return this.http.post<MensagemInterface>(this.url, mensagem);
  }

}
