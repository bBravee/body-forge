import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { ILogin } from 'src/app/shared/interfaces/ILogIn.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedUser$ = new BehaviorSubject<boolean>(false);

  constructor(private auth: AngularFireAuth) {}

  logIn(credentials: ILogin): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );
  }
}
