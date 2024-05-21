import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginPageGuard } from './core/guards/login-page.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/log-in',
    pathMatch: 'full',
  },
  {
    path: 'log-in',
    component: AuthFormComponent,
    pathMatch: 'full',
    canActivate: [LoginPageGuard],
  },
  {
    path: 'register',
    component: RegistrationComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
