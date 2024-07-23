import { Component, OnInit } from '@angular/core';
import { TrainingStatisticsService } from 'src/app/workout/services/training-statistics.service';
import Chart from 'chart.js/auto';
import { TrainingsListService } from 'src/app/workout/services/trainings-list.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { toastStatus } from 'src/app/shared/enums/toastStatus.enum';
import { toastMessages } from 'src/app/shared/enums/toastMessages.enum';
import { Training } from 'src/app/workout/models/Training.type';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  public chart: any;
  exercises: { name: string; muscle: string }[] = [];
  selectedExercise: { name: string; muscle: string } | undefined;
  userTrainings: Training[];
  private currentYearTrainings: number[] = [];
  labels: any = [];
  datasets: any = [];

  constructor(
    private toastService: ToastService,
    private trainingStatisticsService: TrainingStatisticsService,
    private trainingsListService: TrainingsListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prepareWorkoutsCountChart();

    this.trainingStatisticsService.getAllExercises().subscribe((exercises) => {
      this.exercises = Object.values(exercises);
      console.log(exercises);
    });

    this.trainingStatisticsService.getFavoriteExercise();
  }

  protected onSelectExercise() {
    this.trainingsListService
      .getTrainingsListForUser()
      .subscribe((trainings) => {
        const hasChoosenExercise = Object.values(trainings).some((training) => {
          return (
            training.exercises &&
            Object.values(training.exercises).some(
              (exercise) => exercise.name === this.selectedExercise?.name
            )
          );
        });
        if (hasChoosenExercise) {
          this.router.navigate([`statistics/${this.selectedExercise?.name}`]);
        } else {
          this.toastService.showToast({
            severity: toastStatus.error,
            message: toastMessages.noExercisesFound,
          });
        }
      });
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
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Distribution of Exercise Counts Across Months (Current Year)',
            font: {
              size: 24,
            },
          },
        },
      },
    });
  }
}
