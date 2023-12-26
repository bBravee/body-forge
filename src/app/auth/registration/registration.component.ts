import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordRepeated: ['', Validators.required],
    });
  }

  register() {
    const { email, password } = this.registerForm.value;
    this.authService.register({ email, password }).subscribe(
      (res) => {
        console.log(res);
        this.authService.isLoggedUser$.next(true);
        this.authService.addNewUser(res.user?.uid).subscribe((res) => {
          this.toastService.showToast({
            severity: toastStatus.success,
            message: toastMessages.loginOk,
          });
          this.router.navigate(['workout-main']);
        });
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
