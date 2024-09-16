import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Libro } from '../../interfaces/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  public http = inject(HttpClient);
  private baseUrl: string = environment.apiUrl;

constructor() { }

GetLibros(): Observable<Libro[]> {
  return this.http.get<Libro[]>(`${this.baseUrl}libros`);
}

PostLibro(autor:Libro): Observable<Libro> {
  return this.http.post<Libro>(`${this.baseUrl}libros`, autor);
}

PutLibro(id: number|undefined, autor: Libro): Observable<Libro> {
  return this.http.put<Libro>(`${this.baseUrl}libros/${id}`, autor);
}


DeleteLibro(id: number|undefined): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}libros/${id}`);
}

}
