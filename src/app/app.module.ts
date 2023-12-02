import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { StatisticsModule } from './statistics/statistics.module';
import { WorkoutModule } from './workout/workout.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment.development';
import { AuthModule } from './auth/auth.module';
import { StatisticsRoutingModule } from './statistics/statistics-routing.module';
import { WorkoutRoutingModule } from './workout/workout-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StatisticsRoutingModule,
    WorkoutRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    // Primeng
    ButtonModule,
    MenubarModule,
    DividerModule,
    CalendarModule,
    InputTextModule,
    DialogModule,
    MenubarModule,
    // My modules
    WorkoutModule,
    CoreModule,
    StatisticsModule,
    AuthModule,
    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
