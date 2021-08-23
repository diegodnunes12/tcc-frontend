import { ContatosInterface } from './../interfaces/contatos.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EstadosInterface {
  id: number;
  sigla: string;
  nome: string;
}

export interface CidadesInterface {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class CidadesEstadosService {

  constructor(private http: HttpClient) { }

  public getEstados(): Observable<EstadosInterface[]> {
    return this.http.get<EstadosInterface[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`);
  }

  public getCidades(uf: string): Observable<CidadesInterface[]> {
    return this.http.get<CidadesInterface[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
  }
}
