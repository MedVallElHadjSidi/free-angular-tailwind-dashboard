import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  // ❌ pas de token → pas connecté
  if (!tokenService.has()) {
    return router.createUrlTree(['/signin']);
  }

  // ❌ token expiré → logout
  if (tokenService.isExpired()) {
    tokenService.clear();
    return router.createUrlTree(['/signin']);
  }

  // ✅ token valide
  return true;
};
