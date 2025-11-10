import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserService);
  const router = inject(Router);

  // ✅ Si el usuario está autenticado, permitir acceso
  if (authService.isLoggedIn()) {
    return true;
  }

  // ❌ Si no está autenticado, redirigir al login
  return router.parseUrl('auth/login'); // <-- ajusta la ruta según tu aplicación
};
