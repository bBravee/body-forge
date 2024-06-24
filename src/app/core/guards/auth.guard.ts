import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    const { expirationTime } =
      this.authService.isLoggedIn() && this.authService.getUserFromLS();

    if (!this.authService.isLoggedIn()) {
      this.authService.redirectUrl = state.url;
      this.router.navigate(['auth/log-in']);
      return false;
    }
    if (
      this.authService.isLoggedIn() &&
      this.authService.checkTokenExpiration(expirationTime)
    ) {
      this.authService.redirectUrl = state.url;
      return this.authService.logOut().pipe(map(() => true));
    }
    return true;
  }
}
