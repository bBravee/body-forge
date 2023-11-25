import { Injectable, inject, runInInjectionContext } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export const userFeaturesGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);

  return authService.isLoggedUser$.getValue();
};
