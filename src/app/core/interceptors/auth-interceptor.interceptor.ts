import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  const token = cookieService.get('usrLogtkn');
  let request = req;

  if (token) {
    try {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error al agregar el token:', error);
    }
  }

  return next(request);
};
