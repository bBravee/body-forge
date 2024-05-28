import { Injectable } from '@angular/core';
import { Exercise } from '../models/TrainingsList.type';
import { IExerciseFromDB } from '../models/IExerciseFromDB.type';
import { ExerciseDetails } from '../models/ExerciseDetails.type';
import { ExercisesListService } from './exercises-list.service';

export type NewTraining = {
  date: string;
  exercises: Exercise[];
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
    this.newTraining.exercises.push({ ...exercise, sets: [] });
    this.exercisesListService.exercisesList$.next(this.newTraining.exercises);
    this.exercisesListService.isListEmpty$.next(false);
    console.log(this.newTraining);
  }

  addSetsToExercise(sets: ExerciseDetails[]) {
    this.newTraining.exercises.forEach((exercise) => {
      sets.forEach((set) => {
        exercise.sets.push(set);
      });
    });

    console.log(this.newTraining);
  }
}
