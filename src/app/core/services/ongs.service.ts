import { OngInterface } from './../interfaces/ong.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OngsService {

  private url: string = "https://adotejaapi.herokuapp.com/ongs";

  constructor(private http: HttpClient) { }

  public cadastrar(ong: OngInterface): Observable<OngInterface> {
    return this.http.post<OngInterface>(`${this.url}`, ong);
  }

  public getOng(id: string): Observable<OngInterface> {
    return this.http.get<OngInterface>(`${this.url}/${id}`);
  }

  public alterarOng(id: string, ong: OngInterface): Observable<OngInterface> {
    return this.http.patch<OngInterface>(`${this.url}/${id}`, ong);
  }

  public getOngPorCnpj(cnpj: string) {
    return this.http.get(`${this.url}/cnpj/${cnpj}`);
  }
}
