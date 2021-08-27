import { FiltroInterface } from './../interfaces/filtro.interface';
import { Observable } from 'rxjs';
import { EspecieInterface } from './../interfaces/especie.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspeciesService {

  private url: string = "https://adotejaapi.herokuapp.com/especies";

  constructor(private http: HttpClient) { }

  public getAll(): Observable<EspecieInterface[]> {
    return this.http.get<EspecieInterface[]>(this.url);
  }

  public delete(id: string): Observable<EspecieInterface> {
    return this.http.delete<EspecieInterface>(`${this.url}/${id}`);
  }
}
