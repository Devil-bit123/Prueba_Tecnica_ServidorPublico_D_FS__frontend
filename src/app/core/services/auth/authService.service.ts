import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl: string = environment.apiUrl;
  public http = inject(HttpClient);

constructor() { }

login(email: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}login`, { email, password });
}



}
