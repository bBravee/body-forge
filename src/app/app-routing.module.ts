import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/log-in',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'statistics',
    loadChildren: () =>
      import('./statistics/statistics.module').then((m) => m.StatisticsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'workout',
    loadChildren: () =>
      import('./workout/workout.module').then((m) => m.WorkoutModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'workout/workout-main',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
