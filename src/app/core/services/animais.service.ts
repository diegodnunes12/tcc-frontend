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

  public getAll(): Observable<AnimaisInterface[]> {
    return this.http.get<AnimaisInterface[]>(this.url);
  }

  public delete(id: string): Observable<AnimaisInterface> {
    return this.http.delete<AnimaisInterface>(`${this.url}/${id}`);
  }

}
