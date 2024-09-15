import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('usrLogtkn');

  if (token) {
  return true; // Permite el acceso a la ruta

  } else {
    router.navigate(['']); // Redirige al usuario a la página de inicio si no hay token
    return false; // Bloquea el acceso a la ruta
  }

};
