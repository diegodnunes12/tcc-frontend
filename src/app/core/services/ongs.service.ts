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
}
