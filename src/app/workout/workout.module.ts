import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutMainComponent } from './components/workout-main/workout-main.component';
import { NewWorkoutComponent } from './components/new-workout/new-workout.component';
import { DividerModule } from 'primeng/divider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';

@NgModule({
  declarations: [WorkoutMainComponent, NewWorkoutComponent, ExercisesListComponent],
  imports: [
    CommonModule,
    DividerModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class WorkoutModule {}
