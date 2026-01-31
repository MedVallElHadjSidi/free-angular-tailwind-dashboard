// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { TokenService } from '../services/token.service';
// import { AuthService } from '../services/auth.service';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const tokenService = inject(TokenService);
//   const authService = inject(AuthService);

//   const token = tokenService.get();

//   const authReq = token
//     ? req.clone({
//         setHeaders: { Authorization: `Bearer ${token}` }
//       })
//     : req;

//   return next(authReq).pipe(
//     catchError(err => {
//       if (err.status === 401) {
//         authService.logout();
//       }
//       return throwError(() => err);
//     })
//   );
// };

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertService } from '../ui/alert.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const alertService = inject(AlertService);

  // 🔹 Ne pas intercepter login
  if (req.url.includes('/login')) {
    return next(req).pipe(
      catchError(err => {
        alertService.error(
          'Connexion échouée',
          err?.error?.non_field_errors?.[0] || 'Identifiants invalides'
        );
        return throwError(() => err);
      })
    );
  }

  const token = tokenService.get();

  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    : req;

  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401) {
        authService.logout();
        alertService.error(
          'Session expirée',
          'Veuillez vous reconnecter'
        );
      } else if (err.status === 403) {
        alertService.error(
          'Accès refusé',
          'Vous n’avez pas les permissions nécessaires'
        );
      } else {
        alertService.error(
          'Erreur',
          'Une erreur inattendue est survenue'
        );
      }

      return throwError(() => err);
    })
  );
};
