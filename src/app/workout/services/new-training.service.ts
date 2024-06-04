import { Injectable } from '@angular/core';
import { IExerciseFromDB } from '../models/IExerciseFromDB.type';
import { ExerciseDetails } from '../models/ExerciseDetails.type';
import { ExercisesListService } from './exercises-list.service';
import * as uuid from 'uuid';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Exercise } from '../models/ExerciseWithId.type';
import { NewTraining } from '../models/NewTraining.type';

@Injectable({
  providedIn: 'root',
})
export class NewTrainingService {
  newTraining: NewTraining = { date: new Date().toString(), exercises: {} };

  constructor(
    private http: HttpClient,
    public exercisesListService: ExercisesListService,
    private authService: AuthService
  ) {}

  resetTraining() {
    this.newTraining = { date: '', exercises: {} };
    this.exercisesListService.updateExercisesList([]);
    this.exercisesListService.isListEmpty$.next(true);
  }

  addExerciseToTraining(exercise: IExerciseFromDB) {
    const exerciseId = uuid.v4();
    this.newTraining.exercises[exerciseId] = {
      ...exercise,
      sets: {},
    };

    this.exercisesListService.updateExercisesList(this.exercisesToArray());
    this.exercisesListService.isListEmpty$.next(false);
  }

  exercisesToArray(): Exercise[] {
    return Object.keys(this.newTraining.exercises).map((key) => {
      return { id: key, ...this.newTraining.exercises[key] };
    });
  }

  addSetsToExercise(exerciseId: string, sets: ExerciseDetails[]) {
    sets.forEach((set, index) => {
      const setId = `set${index + 1}`;
      this.newTraining.exercises[exerciseId].sets[setId] = set;
    });
    console.log(this.newTraining);
  }

  deleteExercise(exerciseId: string) {
    delete this.newTraining.exercises[exerciseId];
    this.exercisesListService.updateExercisesList(this.exercisesToArray());
    this.exercisesListService.checkIfExercisesEmpty();
  }

  saveNewTraining() {
    return this.http.post(
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings.json`,
      this.newTraining
    );
  }
}
