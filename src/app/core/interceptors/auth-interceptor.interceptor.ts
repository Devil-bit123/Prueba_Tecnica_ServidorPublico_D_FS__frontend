// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';

// export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
//   const cookieService = inject(CookieService);

//   const token = cookieService.get('usrLogtkn');
//   let request = req;

//   if (token) {
//     try {
//       request = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     } catch (error) {
//       console.error('Error al agregar el token:', error);
//     }
//   }

//   return next(request);
// };



import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  // URL que quieres excluir del interceptor
  const excludedUrl = 'https://api.covidtracking.com/v1/us/daily.json';

  // Verifica si la URL de la solicitud coincide con la URL excluida
  if (req.url === excludedUrl) {
    // Si coincide, simplemente pasa la solicitud al siguiente manejador sin modificarla
    return next(req);
  }

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
