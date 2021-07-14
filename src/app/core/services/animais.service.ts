import { AnimaisInterface } from './../interfaces/animais.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  private url: string = "https://adotejaapi.herokuapp.com/animais";

  constructor(private http: HttpClient) { }

  public cadastrar(animal: AnimaisInterface): Observable<AnimaisInterface> {
    return this.http.post<AnimaisInterface>(this.url, animal);
  }

  public alterar(animal: AnimaisInterface, animalId: string): Observable<AnimaisInterface> {
    return this.http.patch<AnimaisInterface>(`${this.url}/${animalId}`, animal);
  }

  public getAll(): Observable<AnimaisInterface[]> {
    return this.http.get<AnimaisInterface[]>(this.url);
  }

  public getById(id: string): Observable<AnimaisInterface> {
    return this.http.get<AnimaisInterface>(`${this.url}/${id}`);
  }

  public delete(id: string): Observable<AnimaisInterface> {
    return this.http.delete<AnimaisInterface>(`${this.url}/${id}`);
  }

}
