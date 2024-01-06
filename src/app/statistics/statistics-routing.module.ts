import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { NgModule } from '@angular/core';
import { userFeaturesGuard } from '../core/guards/user-features.guard';

const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {}
