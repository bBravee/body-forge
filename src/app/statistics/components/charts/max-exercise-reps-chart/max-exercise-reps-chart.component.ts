import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { TrainingStatisticsService } from 'src/app/workout/services/training-statistics.service';
import { TrainingsListService } from 'src/app/workout/services/trainings-list.service';

@Component({
  selector: 'app-max-exercise-reps-chart',
  templateUrl: './max-exercise-reps-chart.component.html',
  styleUrls: ['./max-exercise-reps-chart.component.scss'],
})
export class MaxExerciseRepsChartComponent {
  public chart: any;
  private labels: any = [];
  private datasets: any = [];
  private choosenExercise: string;
  private colors = {
    purple: {
      default: 'rgba(76, 79, 233, 1)',
      half: 'rgba(76, 79, 233, 0.5)',
      quarter: 'rgba(76, 79, 233, 0.25)',
      zero: 'rgba(76, 79, 233, 0)',
    },
    indigo: {
      default: 'rgba(80, 102, 120, 1)',
      quarter: 'rgba(80, 102, 120, 0.25)',
    },
  };
  gradient: any;

  constructor(
    private route: ActivatedRoute,
    private trainingStatisticsService: TrainingStatisticsService,
    private trainingsListService: TrainingsListService
  ) {}

  ngOnInit(): void {
    this.getChoosenExercise();
    this.prepareExerciseChart(this.choosenExercise);
  }

  private getChoosenExercise() {
    this.route.params.subscribe((params) => {
      this.choosenExercise = params['exerciseStats'];
    });
  }

  private prepareExerciseChart(exerciseName: string) {
    this.trainingsListService
      .getTrainingsListForUser()
      .subscribe((trainings) => {
        Object.values(trainings).forEach((training) => {
          Object.values(training.exercises).forEach((exercise) => {
            if (exercise.name === exerciseName) {
              this.labels.push(
                this.trainingStatisticsService.transformDateFormat(
                  training.date
                )
              );
              this.datasets.push(
                this.trainingStatisticsService.computeMaxExerciseReps(exercise)
              );
            }
          });
        });
        this.createChart(this.labels, this.datasets);
      });
  }

  private createChart(labels: any, datasets: any) {
    const canvas = <HTMLCanvasElement>document.getElementById('MyChart2');
    const ctx = canvas.getContext('2d');

    this.gradient = ctx?.createLinearGradient(0, 0, 0, 700);
    this.gradient.addColorStop(0, this.colors.purple.half);
    this.gradient.addColorStop(0.4, this.colors.purple.quarter);
    this.gradient.addColorStop(1, this.colors.purple.zero);

    this.chart = new Chart('MyChart2', {
      type: 'line',

      data: {
        labels: labels,
        datasets: [
          {
            yAxisID: 'yAxis',
            fill: true,
            label: 'Weight',
            data: datasets,
            backgroundColor: this.gradient,
            pointBackgroundColor: this.colors.purple.default,
            borderColor: this.colors.purple.default,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Maximum reps done in individual training sessions (${this.choosenExercise})`,
            font: {
              size: 24,
            },
          },
        },
        scales: {
          yAxis: {
            grid: {
              display: true,
              color: this.colors.indigo.quarter,
            },
          },
        },
      },
    });
  }
}
