import { AnimaisInterface } from './../interfaces/animais.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  private url: string = "https://adotejaapi.herokuapp.com/animais";

  constructor(private http: HttpClient) { }

  public cadastrar(formData: FormData): Observable<AnimaisInterface> {
    return this.http.post<AnimaisInterface>(this.url, formData);
  }

  public alterar(formData: FormData, animalId: string): Observable<AnimaisInterface> {
    return this.http.patch<AnimaisInterface>(`${this.url}/${animalId}`, formData);
  }

  public getAll(): Observable<AnimaisInterface[]> {
    return this.http.get<AnimaisInterface[]>(this.url);
  }

  public getAllAnimaisDaOng(): Observable<AnimaisInterface[]> {
    return this.http.get<AnimaisInterface[]>(`${this.url}/ong`, { headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')) });
  }

  public getById(id: string): Observable<AnimaisInterface> {
    return this.http.get<AnimaisInterface>(`${this.url}/${id}`);
  }

  public delete(id: string): Observable<AnimaisInterface> {
    return this.http.delete<AnimaisInterface>(`${this.url}/${id}`);
  }

}
