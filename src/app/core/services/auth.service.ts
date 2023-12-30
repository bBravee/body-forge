import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { ICredentials } from 'src/app/shared/interfaces/ILogIn.model';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { toastStatus } from 'src/app/shared/enums/toastStatus.enum';
import { toastMessages } from 'src/app/shared/enums/toastMessages.enum';

interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedUser$ = new BehaviorSubject<boolean>(false);
  loggedUser: any;
  fieldsInvalid: boolean;

  constructor(
    private auth: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.loggedUser = user;
        console.log('User logged: ' + this.loggedUser);
        localStorage.setItem('user', JSON.stringify(this.loggedUser));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  logIn(credentials: ICredentials) {
    console.log('logIn call');
    from(
      this.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    ).subscribe(
      () => {
        this.auth.authState.subscribe(
          (user) => {
            if (user) {
              this.toastService.showToast({
                severity: toastStatus.success,
                message: toastMessages.loginOk,
              });
              this.router.navigate(['workout-main']);
            }
          },
          (error) => {
            this.toastService.showToast({
              severity: toastStatus.error,
              message: toastMessages.loginError,
            });
          }
        );
      },
      (error) => {
        this.toastService.showToast({
          severity: toastStatus.error,
          message: toastMessages.loginError,
        });
      }
    );
  }

  logOut() {
    return from(this.auth.signOut());
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

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
}
