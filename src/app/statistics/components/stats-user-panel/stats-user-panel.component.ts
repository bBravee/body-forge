import { Component, OnInit } from '@angular/core';
import { TrainingStatisticsService } from 'src/app/workout/services/training-statistics.service';

@Component({
  selector: 'app-stats-user-panel',
  templateUrl: './stats-user-panel.component.html',
  styleUrls: ['./stats-user-panel.component.scss'],
})
export class StatsUserPanelComponent implements OnInit {
  protected favoriteExercises$ =
    this.trainingStatisticService.favoriteExercises$;
  protected trainingsCount$ = this.trainingStatisticService.trainingsCount$;

  constructor(private trainingStatisticService: TrainingStatisticsService) {}

  ngOnInit(): void {
    this.trainingStatisticService.getFavoriteExercise();
    this.trainingStatisticService.getTotalTrainingsCount();
  }
}
