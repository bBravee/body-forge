import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { ICredentials } from 'src/app/shared/interfaces/ILogIn.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedUser$ = new BehaviorSubject<boolean>(false);
  loggedUser: any;
  constructor(private auth: AngularFireAuth, private http: HttpClient) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.loggedUser = user;
        this.isLoggedUser$.next(true);
        console.log('Change user: ' + user);
      } else {
        this.loggedUser = null;
        this.isLoggedUser$.next(false);
      }
    });
  }

  logIn(credentials: ICredentials): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );
  }

  register(user: ICredentials) {
    return from(
      this.auth.createUserWithEmailAndPassword(user.email, user.password)
    );
  }

  addNewUser(id: string | undefined) {
    return this.http.post(
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${id}.json`,
      { registerDate: new Date().toDateString() }
    );
  }
}
