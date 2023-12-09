import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { ILogin } from 'src/app/shared/interfaces/ILogIn.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedUser$ = new BehaviorSubject<boolean>(false);
  loggedUser: any;
  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.loggedUser = user;
        this.isLoggedUser$.next(true);
      } else {
        this.loggedUser = null;
        this.isLoggedUser$.next(false);
      }
    });
  }

  logIn(credentials: ILogin): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );
  }
}
