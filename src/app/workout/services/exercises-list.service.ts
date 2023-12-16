import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { IExerciseFromDB } from '../models/IExerciseFromDB.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExercisesListService {
  exercisesList$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  addExerciseToTrainingById(trainingId: string, exercise: IExerciseFromDB) {
    return this.http.post(
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings/${trainingId}/exercises.json`,
      exercise
    );
  }

  getExercisesForTraining(trainingId: string) {
    this.http
      .get(
        `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings/${trainingId}/exercises.json`
      )
      .subscribe((res) => {
        this.exercisesList$.next(Object.values(res));
      });
  }
}
