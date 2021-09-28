import { CampanhasInterface } from './../interfaces/campanhas.interface';
import { Observable } from 'rxjs';
import { EspecieInterface } from '../interfaces/especie.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampanhasService {

  private url: string = "https://adotejaapi.herokuapp.com/campanhas";

  constructor(private http: HttpClient) { }

  public cadastrar(campanha: CampanhasInterface): Observable<CampanhasInterface> {
    return this.http.post<CampanhasInterface>(this.url, campanha)
  }

  public alterar(id: string, campanha: CampanhasInterface): Observable<CampanhasInterface> {
    return this.http.patch<CampanhasInterface>(`${this.url}/${id}`, campanha);
  }

  public getAll(ongId: string): Observable<CampanhasInterface[]> {
    return this.http.get<CampanhasInterface[]>(`${this.url}/ong/${ongId}`);
  }

  public delete(id: string): Observable<CampanhasInterface> {
    return this.http.delete<CampanhasInterface>(`${this.url}/${id}`);
  }

  public getById(id: string): Observable<CampanhasInterface> {
    return this.http.get<CampanhasInterface>(`${this.url}/${id}`);
  }
}
