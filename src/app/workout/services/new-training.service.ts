import { Injectable } from '@angular/core';
import { IExerciseFromDB } from '../models/IExerciseFromDB.type';

import { ExercisesListService } from './exercises-list.service';
import * as uuid from 'uuid';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';

import { Training } from '../models/Training.type';
import { ExerciseSet } from '../models/ExerciseSet.type';
import { ExerciseWithId } from '../models/ExerciseWithId.type';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NewTrainingService {
  newTraining: Training = { date: new Date().toString(), exercises: {} };

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

  exercisesToArray(): ExerciseWithId[] {
    return Object.keys(this.newTraining.exercises).map((key) => {
      return { id: key, ...this.newTraining.exercises[key] };
    });
  }

  addSetsToExercise(exerciseId: string, sets: ExerciseSet[]) {
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
      `${environment.firebase.databaseURL}/users/${this.authService.loggedUser.uid}/trainings.json?auth=${this.authService.authToken}`,
      this.newTraining
    );
  }
}
