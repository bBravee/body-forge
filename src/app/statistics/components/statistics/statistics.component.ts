import { Component, OnInit } from '@angular/core';
import { TrainingStatisticsService } from 'src/app/workout/services/training-statistics.service';
import Chart from 'chart.js/auto';
import { TrainingsListService } from 'src/app/workout/services/trainings-list.service';
import { cs } from 'date-fns/locale';
import { format } from 'date-fns';
import { WorkoutFromDB } from 'src/app/workout/models/TrainingsList.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  public chart: any;
  exercises: { name: string; muscle: string }[] = [];
  selectedExercise: { name: string; muscle: string } | undefined;
  userTrainings: WorkoutFromDB[];
  currentYearTrainings: number[] = [];
  labels: any = [];
  datasets: any = [];

  constructor(
    private trainingStatisticsService: TrainingStatisticsService,
    private trainingsListService: TrainingsListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prepareWorkoutsCountChart();

    this.trainingStatisticsService.getAllExercises().subscribe((exercises) => {
      this.exercises = Object.values(exercises);
    });
    // this.trainingStatisticsService.getUserExercises().subscribe((trainings) => {
    //   Object.values(trainings).forEach((training) => {
    //     Object.values(training.exercises).forEach((exercise) => {
    //       if (exercise.name === 'Lateral Raises') {
    //         this.labels.push(
    //           this.trainingStatisticsService.transformDateFormat(training.date)
    //         );
    //         this.datasets.push(
    //           this.trainingStatisticsService.computeMaxExerciseWeight(exercise)
    //         );
    //       }
    //     });
    //   });
    //   this.createChart(this.labels, this.datasets);
    // });
  }

  protected onSelectExercise() {
    console.log(this.selectedExercise);
    if (this.selectedExercise) {
      this.router.navigate([`statistics/${this.selectedExercise.name}`]);
    }
  }

  private prepareWorkoutsCountChart() {
    this.trainingsListService.getTrainingsListForUser().subscribe((res) => {
      this.userTrainings = Object.values(res).filter((training) => {
        const trainingDate = new Date(training.date);
        console.log(trainingDate.getMonth());
        return trainingDate.getFullYear() === new Date().getFullYear();
      });
      for (let i = 0; i < 12; i++) {
        const currentMonthRecords = this.userTrainings.reduce(
          (count: number, record: any) => {
            const trainingDate = new Date(record.date);
            if (trainingDate.getMonth() === i) {
              return count + 1;
            } else {
              return count;
            }
          },
          0
        );
        this.currentYearTrainings.push(currentMonthRecords);
      }
      this.createChart(this.currentYearTrainings);
    });
  }

  private createChart(datasets: any) {
    this.chart = new Chart('MyChart', {
      type: 'bar',

      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Workouts Count',
            data: datasets,
            backgroundColor: '#FFD54F',
            borderColor: '#ffe284',
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Distribution of Exercise Counts Across Months (Current Year)',
            font: {
              size: 24,
            },
          },
        },
        aspectRatio: 2.5,
      },
    });

    // this.chart = new Chart('MyChart', {
    //   type: 'line',

    //   data: {
    //     labels: labels,
    //     datasets: [
    //       {
    //         label: 'Weight',
    //         data: datasets,
    //         backgroundColor: '#FFD54F',
    //         borderColor: '#ffe284',
    //       },
    //     ],
    //   },
    //   options: {
    //     aspectRatio: 2.5,
    //   },
    // });
  }
}
