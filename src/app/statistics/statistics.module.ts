import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [CommonModule, ButtonModule, RouterModule],
})
export class StatisticsModule {}
