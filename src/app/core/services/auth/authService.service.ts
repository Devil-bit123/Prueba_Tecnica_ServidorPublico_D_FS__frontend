import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { UserResponse } from '../../interfaces/UserResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl: string = environment.apiUrl;
  public http = inject(HttpClient);
  private cookieService = inject(CookieService);

constructor() { }

login(email: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}login`, { email, password });
}

userInfo(){
  return this.http.get<UserResponse>(`${this.baseUrl}user`);
}

getUserInfoAndSaveToCookie(): void {
  this.userInfo().subscribe({
    next: (data) => {
      this.cookieService.set('userInfo', JSON.stringify(data));
    },
    error: (error) => {
      console.error(error);
    }
  });
}

getUserFromCookie(): UserResponse | null {
  const userInfo = this.cookieService.get('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
}

logout(){
  return this.http.post<any>(`${this.baseUrl}logout`,null);
}

}
