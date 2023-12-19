import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { IExerciseFromDB } from '../models/IExerciseFromDB.model';
import { BehaviorSubject, concatMap } from 'rxjs';
import { TrainingsListService } from './trainings-list.service';
import { ExerciseDetails } from '../models/ExerciseDetails.type';

@Injectable({
  providedIn: 'root',
})
export class ExercisesListService {
  isListEmpty$ = new BehaviorSubject<boolean>(true);
  exercisesList$ = new BehaviorSubject<any>([]);
  currentTrainingId: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private trainingsListService: TrainingsListService
  ) {}

  addExerciseToTrainingById(trainingId: string, exercise: IExerciseFromDB) {
    return this.http.post(
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings/${trainingId}/exercises.json`,
      exercise
    );
  }

  // Napisać metodę getExercisesForCurrentTraining i wywołać ją w exercise-item kiedy zostaną zapisane dane
  // niech metoda pobiera dane dla aktualnego treningu i przypisuje je do subjecta. W exercise-list będzie subscribe do tego subjecta
  getExercisesForCurrentTraining() {
    this.trainingsListService
      .getTrainingsListForUser()
      .pipe(
        concatMap((trainings) => {
          const keys = Object.keys(trainings);
          const currentTrainingId = keys[keys.length - 1];
          this.currentTrainingId = currentTrainingId;
          return this.http.get(
            `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings/${currentTrainingId}/exercises.json`
          );
        })
      )
      .subscribe((res) => {
        if (res === null) {
          console.log('empty');
          this.isListEmpty$.next(true);
        } else {
          const outputArr = Object.entries(res).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          this.isListEmpty$.next(false);
          this.exercisesList$.next(outputArr);
        }
      });
  }

  addDetailsToExercise(exerciseDetails: ExerciseDetails, exerciseId: string) {
    return this.http.post(
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings/${this.currentTrainingId}/exercises/${exerciseId}/sets.json`,
      exerciseDetails
    );
  }
}
