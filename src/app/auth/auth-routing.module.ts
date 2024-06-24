import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { LoginPageGuard } from '../core/guards/login-page.guard';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'log-in',
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
    canActivate: [LoginPageGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
