import { Injectable, TestabilityRegistry } from '@angular/core';
import { WorkoutFromDB } from '../models/TrainingsList.type';
import { TrainingsListService } from './trainings-list.service';
import { Exercise } from '../models/Exercise.type';
import { BehaviorSubject, count, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingStatisticsService {
  trainingsList: WorkoutFromDB[];
  favoriteExercises$ = new BehaviorSubject<string[]>([]);
  trainingsCount$ = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private trainingListService: TrainingsListService
  ) {}

  getAllExercises() {
    return this.http.get(
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/exercises.json`
    );
  }

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

  computeMaxExerciseWeight(exercise: any) {
    const sets: any[] = Object.values(exercise.sets);
    const maxWeight = sets.reduce(
      (max, current) => (current.weight > max ? current.weight : max),
      0
    );
    return maxWeight;
  }

  getFavoriteExercise() {
    this.trainingListService
      .getTrainingsListForUser()
      .subscribe((trainings) => {
        let favoriteExercises: string[] = [];
        const counts: any = {};
        Object.values(trainings).forEach((training) => {
          Object.values(training.exercises).forEach((exercise) => {
            const name = exercise.name;
            counts[name] = (counts[name] || 0) + 1;
          });

          let maxCount = 0;
          for (const name in counts) {
            if (counts[name] > maxCount) {
              maxCount = counts[name];
              favoriteExercises = [name];
            } else if (counts[name] === maxCount) {
              favoriteExercises.push(name);
            }
          }
        });
        this.favoriteExercises$.next(favoriteExercises);
      });
  }

  getTotalTrainingsCount() {
    this.trainingListService
      .getTrainingsListForUser()
      .subscribe((trainings) => {
        this.trainingsCount$.next(Object.values(trainings).length);
      });
  }
}
