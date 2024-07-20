import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  BehaviorSubject,
  Observable,
  catchError,
  from,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ICredentials } from 'src/app/shared/interfaces/ILogIn.model';
import { Router, RouterStateSnapshot } from '@angular/router';
import { ToastService } from './toast.service';
import { toastStatus } from 'src/app/shared/enums/toastStatus.enum';
import { toastMessages } from 'src/app/shared/enums/toastMessages.enum';
import { environment } from 'src/environments/environment.development';

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
  authToken: string | null;
  redirectUrl: string | null = null;
  authToken$: Observable<string | null>;

  constructor(
    private auth: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  checkTokenExpiration(tokenExpTime: number) {
    return Date.now() > tokenExpTime;
  }

  extractUserInfo(userObj: any) {
    const {
      uid,
      displayName,
      _delegate: { accessToken },
      _delegate: {
        stsTokenManager: { expirationTime },
      },
    } = userObj;
    return { uid, displayName, accessToken, expirationTime };
  }

  getUserFromLS() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user;
  }

  getToken(): Observable<string> {
    return from(this.auth.currentUser).pipe(
      switchMap((user) => {
        if (user) {
          return from(user.getIdToken());
        } else {
          return throwError('User not authenticated');
        }
      })
    );
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
              this.loggedUser = this.extractUserInfo(user);
              localStorage.setItem('user', JSON.stringify(this.loggedUser));
              this.isLoggedUser$.next(true);

              this.toastService.showToast({
                severity: toastStatus.success,
                message: toastMessages.loginOk,
              });

              user.getIdToken().then((token) => {
                this.authToken = token;
              });

              const redirectUrl = this.redirectUrl || 'workout/workout-main';
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

  logOut() {
    return from(this.auth.signOut()).pipe(
      tap(() => {
        console.log('Logging out...');
        localStorage.removeItem('user');
        this.isLoggedUser$.next(false);
        this.router.navigate(['/auth/log-in']);
        this.authToken = null;
      })
    );
  }

  register(user: ICredentials) {
    return from(
      this.auth.createUserWithEmailAndPassword(user.email, user.password)
    );
  }

  addNewUser(id: string | undefined, username: string) {
    return this.getToken().pipe(
      switchMap((token) => {
        const url = `${environment.firebase.databaseURL}/users/${id}.json`;
        return this.http.post(url, {
          registerDate: new Date().toDateString(),
          username,
        });
      }),
      catchError((error) => {
        console.error('Error adding new user:', error);
        return throwError(error);
      })
    );
  }

  isLoggedIn(): boolean {
    const user = this.getUserFromLS();

    if (user) {
      this.loggedUser = user;
      this.isLoggedUser$.next(true);
      this.authToken = this.loggedUser.accessToken;
      return true;
    }
    return false;
  }
}
