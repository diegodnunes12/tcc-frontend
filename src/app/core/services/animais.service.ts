import { FiltroInterface } from './../interfaces/filtro.interface';
import { AnimaisInterface } from './../interfaces/animais.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  //private url: string = "http://localhost:3000/animais";
  private url: string = "https://adotejaapi.herokuapp.com/animais";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('x-access-token', localStorage.getItem('token'));
  }

  public cadastrar(formData: FormData): Observable<AnimaisInterface> {
    return this.http.post<AnimaisInterface>(this.url, formData, { headers:  this.getHeaders() });
  }

  public alterar(formData: FormData, animalId: string): Observable<AnimaisInterface> {
    return this.http.patch<AnimaisInterface>(`${this.url}/${animalId}`, formData, { headers:  this.getHeaders() });
  }

  public getAll(page: number): Observable<AnimaisInterface[]> {
    return this.http.get<AnimaisInterface[]>(`${this.url}?page=${page}`);
  }

  public getAllAnimaisDaOng(id: string): Observable<AnimaisInterface[]> {
    return this.http.get<AnimaisInterface[]>(`${this.url}/ong/${id}`);
  }

  public getById(id: string): Observable<AnimaisInterface> {
    return this.http.get<AnimaisInterface>(`${this.url}/${id}`);
  }

  public delete(id: string): Observable<AnimaisInterface> {
    return this.http.delete<AnimaisInterface>(`${this.url}/${id}`);
  }

  public getAllByFilter(filter: FiltroInterface, page: number): Observable<AnimaisInterface[]> {
    let filtro = '';

    if(filter.especie) { filtro += `especie=${filter.especie}&` }
    if(filter.sexo) { filtro += `sexo=${filter.sexo}&` }
    if(filter.porte) { filtro += `porte=${filter.porte}&` }
    if(filter.castrado) { filtro += `castrado=${filter.castrado}&` }
    if(filter.vacinado) { filtro += `vacinado=${filter.vacinado}&` }
    if(filter.vermifugado) { filtro += `vermifugado=${filter.vermifugado}&` }
    if(filter.estado) { filtro += `estado=${filter.estado}&` }
    if(filter.cidade) { filtro += `cidade=${filter.cidade}&` }

    return this.http.get<AnimaisInterface[]>(`${this.url}/filtro?page=${page}&${filtro}`);
  }
}
