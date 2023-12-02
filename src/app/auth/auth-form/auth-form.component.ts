import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { toastMessages } from 'src/app/shared/enums/toastMessages.enum';
import { toastStatus } from 'src/app/shared/enums/toastStatus.enum';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  protected logInForm: FormGroup;
  isLoggingIn: boolean;
  fieldsInvalid: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  logIn() {
    this.authService.logIn(this.logInForm.value).subscribe(
      (res) => {
        this.authService.isLoggedUser$.next(true);
        this.toastService.showToast({
          severity: toastStatus.success,
          message: toastMessages.loginOk,
        });
        this.router.navigate(['workout-main']);
      },
      (error: any) => {
        this.toastService.showToast({
          severity: toastStatus.error,
          message: toastMessages.loginError,
        });
        this.fieldsInvalid = true;
        console.log(error);
      }
    );
  }
}
