import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // si on est connecté, on autorise l'accès à la route
  if (localStorage.getItem('TOKEN')) {
    // autoriser (return true) l'accès à la route
    return true;
  }

  // rediriger vers la page de login si l'utilisateur n'est pas authentifié
  router.navigate(['/login']);
  return false;
};
