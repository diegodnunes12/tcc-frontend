import { AnimaisInterface } from './../interfaces/animais.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  private url: string = "https://adotejaapi.herokuapp.com/animais";

  private createHeaders(headers: HttpHeaders) {
    headers.append('x-access-token', localStorage.getItem('token'));
  }

  constructor(private http: HttpClient) { }

  public cadastrar(formData: FormData): Observable<AnimaisInterface> {
    return this.http.post<AnimaisInterface>(this.url, formData);
  }

  public alterar(formData: FormData, animalId: string): Observable<AnimaisInterface> {
    return this.http.patch<AnimaisInterface>(`${this.url}/${animalId}`, formData);
  }

  public getAll(): Observable<AnimaisInterface[]> {
    let headers = new HttpHeaders();
    this.createHeaders(headers);
    return this.http.get<AnimaisInterface[]>(this.url, { headers: headers });
  }

  public getById(id: string): Observable<AnimaisInterface> {
    return this.http.get<AnimaisInterface>(`${this.url}/${id}`);
  }

  public delete(id: string): Observable<AnimaisInterface> {
    return this.http.delete<AnimaisInterface>(`${this.url}/${id}`);
  }

}
