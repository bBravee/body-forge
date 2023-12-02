import { CanActivateFn } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);

  console.log(authService.isLoggedUser$.getValue());

  return !authService.isLoggedUser$.getValue();
};
