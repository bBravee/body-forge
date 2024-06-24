import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { userFeaturesGuard } from '../core/guards/user-features.guard';
import { WorkoutMainComponent } from './components/workout-main/workout-main.component';
import { NewWorkoutComponent } from './components/new-workout/new-workout.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { canDeactivateGuard } from '../core/guards/can-deactivate-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'workout-main',
    pathMatch: 'full',
  },
  {
    path: 'workout-main',
    component: WorkoutMainComponent,
  },
  {
    path: 'new-workout',
    component: NewWorkoutComponent,
    canDeactivate: [canDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutRoutingModule {}
