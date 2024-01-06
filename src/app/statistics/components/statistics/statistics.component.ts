import { Component, OnInit } from '@angular/core';
import { TrainingStatisticsService } from 'src/app/workout/services/training-statistics.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  public chart: any;
  labels: any = [];
  datasets: any = [];

  constructor(private trainingStatisticsService: TrainingStatisticsService) {}

  ngOnInit(): void {
    this.trainingStatisticsService.getUserExercises().subscribe((trainings) => {
      Object.values(trainings).forEach((training) => {
        Object.values(training.exercises).forEach((exercise) => {
          if (exercise.name === 'Lateral Raises') {
            this.labels.push(
              this.trainingStatisticsService.transformDateFormat(training.date)
            );
            this.datasets.push(
              this.trainingStatisticsService.computeMaxExerciseWeight(exercise)
            );
          }
        });
      });
      this.createChart(this.labels, this.datasets);
    });
  }

  createChart(labels: any, datasets: any) {
    console.log(datasets);
    this.chart = new Chart('MyChart', {
      type: 'line',

      data: {
        labels: labels,
        datasets: [
          {
            label: 'Weight',
            data: datasets,
            backgroundColor: '#FFD54F',
            borderColor: '#ffe284',
          },
          // TODO: zrobić repsy odpowiadające ciężarowi jako kolejny dataset
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
