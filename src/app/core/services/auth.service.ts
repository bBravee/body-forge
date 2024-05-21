import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, from, tap } from 'rxjs';
import { ICredentials } from 'src/app/shared/interfaces/ILogIn.model';
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
  authToken: any;
  redirectUrl: string | null = null;

  constructor(
    private auth: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {
    this.autoLogin();
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.loggedUser = user;
        localStorage.setItem('user', JSON.stringify(this.loggedUser));
        JSON.parse(localStorage.getItem('user')!);
        this.isLoggedUser$.next(true);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
        this.isLoggedUser$.next(false);
      }
    });
  }

  logIn(credentials: ICredentials) {
    const signInObservable = from(
      this.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );

    signInObservable.subscribe({
      next: () => {
        this.auth.authState.subscribe({
          next: (user) => {
            if (user) {
              this.toastService.showToast({
                severity: toastStatus.success,
                message: toastMessages.loginOk,
              });

              user.getIdToken().then((token) => {
                this.authToken = token;
                this.hasUser(user.uid);
              });

              const redirectUrl = this.redirectUrl || '/workout-main';
              this.router.navigateByUrl(redirectUrl);
              this.redirectUrl = null;
            }
          },
          error: (error) => {
            this.toastService.showToast({
              severity: toastStatus.error,
              message: toastMessages.loginError,
            });
          },
        });
      },
      error: (error) => {
        this.toastService.showToast({
          severity: toastStatus.error,
          message: toastMessages.loginError,
        });
      },
    });
  }

  private autoLogin() {
    this.loggedUser = JSON.parse(localStorage.getItem('user')!);
  }

  logOut() {
    return from(this.auth.signOut()).pipe(
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigate(['log-in']);
      })
    );
  }

  hasUser(id: any) {
    this.getAllUsers().subscribe((users) => {
      if (!Object.keys(users).includes(id)) {
        // Dodanie nowego usera do bazy przekazująca paramsa z jego tokenem
      }
    });
  }

  register(user: ICredentials) {
    return from(
      this.auth.createUserWithEmailAndPassword(user.email, user.password)
    );
  }

  getAllUsers() {
    return this.http.get(
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users.json?auth=${this.authToken}`
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
