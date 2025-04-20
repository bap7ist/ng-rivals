import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../pages/login/services/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Rediriger vers la page de connexion
  router.navigate(['/login']);
  return false;
}; 