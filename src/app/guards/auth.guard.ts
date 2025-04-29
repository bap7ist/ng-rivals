import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../pages/login/services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Charge le profil utilisateur si authentifié
  return authService.getCurrentUser$().pipe(
    map(() => true),
    catchError(() => {
      // En cas d'erreur (token invalide par exemple)
      router.navigate(['/login']);
      return of(false);
    })
  );
}; 