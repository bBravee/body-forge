import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthFormComponent, RegistrationComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
