import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, catchError, from, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { toastMessages } from 'src/app/shared/enums/toastMessages.enum';
import { toastStatus } from 'src/app/shared/enums/toastStatus.enum';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  fieldsInvalid: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeated: ['', Validators.required],
    });
  }

  register() {
    const { email, password, username } = this.registerForm.value;

    this.authService
      .register({ email, password })
      .pipe(
        switchMap((res) => {
          if (res.user) {
            return from(res.user.updateProfile({ displayName: username })).pipe(
              switchMap(() => {
                this.authService.isLoggedUser$.next(true);
                return this.authService.addNewUser(res.user?.uid, username);
              })
            );
          } else {
            this.toastService.showToast({
              severity: toastStatus.error,
              message: toastMessages.loginError,
            });
            return EMPTY;
          }
        }),
        tap(() => {
          this.toastService.showToast({
            severity: toastStatus.success,
            message: toastMessages.loginOk,
          });
          this.router.navigate(['workout-main']);
        }),
        catchError((error: any) => {
          this.toastService.showToast({
            severity: toastStatus.error,
            message: toastMessages.loginError,
          });
          this.fieldsInvalid = true;
          console.log(error);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
