import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  protected logInForm: FormGroup;
  isLoggingIn: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  logIn() {
    this.authService.logIn(this.logInForm.value).subscribe(
      () => {
        console.log('User set');
        this.authService.isLoggedUser$.next(true);
        this.router.navigate(['workout-main']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
