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
export class LoginPageGuard {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['workout/workout-main']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
