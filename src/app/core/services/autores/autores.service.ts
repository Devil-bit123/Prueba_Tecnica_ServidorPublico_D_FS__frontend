import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Autores } from '../../interfaces/autores';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  public http = inject(HttpClient);
  private baseUrl: string = environment.apiUrl;
  constructor() { }

  GetAutores(): Observable<Autores[]> {
    return this.http.get<Autores[]>(`${this.baseUrl}autores`);
  }

  PostAutores(autor:Autores): Observable<Autores> {
    return this.http.post<Autores>(`${this.baseUrl}autores`, autor);
  }

  PutAutores(id: number|undefined, autor: Autores): Observable<Autores> {
    return this.http.put<Autores>(`${this.baseUrl}autores/${id}`, autor);
  }


  DeleteAutor(id: number|undefined): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}autores/${id}`);
}

}
