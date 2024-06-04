import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { IExerciseFromDB } from '../models/IExerciseFromDB.type';
import { BehaviorSubject } from 'rxjs';
import { ExerciseDetails } from '../models/ExerciseDetails.type';
import { Exercise } from '../models/ExerciseWithId.type';

@Injectable({
  providedIn: 'root',
})
export class ExercisesListService {
  isListEmpty$ = new BehaviorSubject<boolean>(true);
  exercisesList$ = new BehaviorSubject<any>([]);
  isSomeExerciseEmpty$ = new BehaviorSubject<any>(false);
  isFormSubmitted = false;
  currentTrainingId: string;

  constructor(private http: HttpClient, private authService: AuthService) {}

  addExerciseToTrainingById(trainingId: string, exercise: IExerciseFromDB) {
    return this.http.post(
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings/${trainingId}/exercises.json`,
      exercise
    );
  }

  addDetailsToExercise(exerciseDetails: ExerciseDetails, exerciseId: string) {
    return this.http.post(
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings/${this.currentTrainingId}/exercises/${exerciseId}/sets.json`,
      exerciseDetails
    );
  }

  deleteExerciseFromTraining(exerciseId: string) {
    return this.http.delete(
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings/${this.currentTrainingId}/exercises/${exerciseId}.json`
    );
  }

  checkIfExercisesEmpty() {
    this.exercisesList$.getValue().length < 1
      ? this.isListEmpty$.next(true)
      : this.isListEmpty$.next(false);
  }

  updateExercisesList(updatedExercises: Exercise[]) {
    this.exercisesList$.next(updatedExercises);
  }
}
