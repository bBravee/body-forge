import { Injectable } from '@angular/core';
import { Exercise, ExerciseSet } from '../models/TrainingsList.type';
import { IExerciseFromDB } from '../models/IExerciseFromDB.type';
import { ExerciseDetails } from '../models/ExerciseDetails.type';
import { ExercisesListService } from './exercises-list.service';
import * as uuid from 'uuid';

export type NewTraining = {
  date: string;
  exercises: {
    id: string;
    muscle: string;
    name: string;
    sets: ExerciseSet[];
  }[];
};

@Injectable({
  providedIn: 'root',
})
export class NewTrainingService {
  newTraining: NewTraining = { date: '', exercises: [] };

  constructor(public exercisesListService: ExercisesListService) {}

  addNewTraining() {
    this.newTraining.date = '245';
    console.log(this.newTraining);
  }

  addExerciseToTraining(exercise: IExerciseFromDB) {
    this.newTraining.exercises.push({ ...exercise, sets: [], id: uuid.v4() });
    this.exercisesListService.exercisesList$.next(this.newTraining.exercises);
    this.exercisesListService.isListEmpty$.next(false);
    console.log(this.newTraining);
  }

  addSetsToExercise(exerciseId: string, sets: ExerciseDetails[]) {
    sets.forEach((set) => {
      this.newTraining.exercises
        .filter((exercise) => exercise.id === exerciseId)
        .map((exercise) => exercise.sets.push(set));
    });
    console.log(this.newTraining);
  }
}
