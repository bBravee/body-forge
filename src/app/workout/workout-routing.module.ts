import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { userFeaturesGuard } from '../core/guards/user-features.guard';
import { WorkoutMainComponent } from './components/workout-main/workout-main.component';
import { NewWorkoutComponent } from './components/new-workout/new-workout.component';

const routes: Routes = [
  {
    path: 'workout-main',
    component: WorkoutMainComponent,
    canActivate: [userFeaturesGuard],
  },
  {
    path: 'new-workout',
    component: NewWorkoutComponent,
    canActivate: [userFeaturesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class WorkoutRoutingModule {}
