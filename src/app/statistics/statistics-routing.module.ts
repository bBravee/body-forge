import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { NgModule } from '@angular/core';
import { userFeaturesGuard } from '../core/guards/user-features.guard';
import { ExersiseStatsComponent } from './components/exersise-stats/exersise-stats.component';

const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsComponent,
  },
  { path: 'statistics/:exerciseStats', component: ExersiseStatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {}
