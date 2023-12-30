import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService: AuthService = inject(AuthService);

//   console.log(authService.isLoggedUser$.getValue());

//   return !authService.isLoggedUser$.getValue();
// };
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (this.authService.isLoggedIn !== true) {
      console.log('user not logged');
      this.router.navigate(['log-in']);
    }
    return true;
  }
}
