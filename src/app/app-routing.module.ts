import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { authGuard } from './auth/auth.guard';
import { RegistrationComponent } from './auth/registration/registration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/workout-main',
    pathMatch: 'full',
  },
  {
    path: 'log-in',
    component: AuthFormComponent,
    canActivate: [authGuard],
    pathMatch: 'full',
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
