import { Injectable, TestabilityRegistry } from '@angular/core';
import { WorkoutFromDB } from '../models/TrainingsList.interface';
import { TrainingsListService } from './trainings-list.service';
import { Exercise } from '../models/Exercise.type';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingStatisticsService {
  trainingsList: WorkoutFromDB[];
  constructor(private trainingListService: TrainingsListService) {}

  getTrainingDetails(training: WorkoutFromDB) {
    const exercises = Object.values(training.exercises);
    let volume = 0;

    exercises.forEach((e) => {
      Object.values(e.sets).forEach((set) => {
        volume += set.reps * set.weight;
      });
    });
    return {
      trainingDate: this.transformDateFormat(training.date),
      trainingName: 'Trening Klaty',
      trainingVolume: volume,
    };
  }

  transformDateFormat(date: string) {
    const inputDate = new Date(date);

    const day = String(inputDate.getUTCDate()).padStart(2, '0');
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
    const year = inputDate.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }

  getUserExercises() {
    return this.trainingListService.getTrainingsListForUser();
  }

  computeMaxExerciseWeight(exercise: any) {
    const sets: any[] = Object.values(exercise.sets);
    const maxWeight = sets.reduce(
      (max, current) => (current.weight > max ? current.weight : max),
      0
    );
    return maxWeight;
  }

  // getUserExercises(exerciseName: string) {
  //   const chartData: { lab: any; datasets: string[] } = {
  //     lab: [],
  //     datasets: [],
  //   };
  //   this.trainingListService.getTrainingsListForUser().subscribe((res) => {
  //     this.trainingsList = Object.values(res);
  //     this.trainingsList.forEach((training) => {
  //       Object.values(training.exercises).forEach((exercise) => {
  //         if (exercise.name === exerciseName) {
  //           chartData.lab.push(exercise.name);
  //           // targetExercises.push({ date: training.date, exercise: exercise });
  //         }
  //       });
  //     });
  //   });
  //   return of(chartData);
  // }
}
