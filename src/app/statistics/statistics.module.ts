import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RouterModule } from '@angular/router';
import { StatsUserPanelComponent } from './components/stats-user-panel/stats-user-panel.component';
import { SharedModule } from '../shared/shared.module';
import { ExersiseStatsComponent } from './components/exersise-stats/exersise-stats.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { MaxExerciseRepsChartComponent } from './components/charts/max-exercise-reps-chart/max-exercise-reps-chart.component';

@NgModule({
  declarations: [
    StatisticsComponent,
    StatsUserPanelComponent,
    ExersiseStatsComponent,
    MaxExerciseRepsChartComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    SharedModule,
    StatisticsRoutingModule,
  ],
})
export class StatisticsModule {}
