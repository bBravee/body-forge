import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { NgModule } from '@angular/core';
import { userFeaturesGuard } from '../core/guards/user-features.guard';
import { ExersiseStatsComponent } from './components/exersise-stats/exersise-stats.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'statistics/:exerciseStats',
    component: ExersiseStatsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {}
