import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor() { }

public http = inject(HttpClient);
private baseUrl: string = environment.dashboardUrl;


GetCovidStats(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}`);
}

getData(): Observable<any[]> {
  const headers = new HttpHeaders(); // Sin el token
  return this.http.get<any[]>(this.baseUrl, { headers });
}

}
