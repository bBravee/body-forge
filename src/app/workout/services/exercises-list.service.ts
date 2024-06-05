import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExerciseWithId } from '../models/ExerciseWithId.type';

@Injectable({
  providedIn: 'root',
})
export class ExercisesListService {
  isListEmpty$ = new BehaviorSubject<boolean>(true);
  exercisesList$ = new BehaviorSubject<any>([]);
  isSomeExerciseEmpty$ = new BehaviorSubject<any>(false);
  isFormSubmitted = false;
  currentTrainingId: string;

  checkIfExercisesEmpty() {
    this.exercisesList$.getValue().length < 1
      ? this.isListEmpty$.next(true)
      : this.isListEmpty$.next(false);
  }

  updateExercisesList(updatedExercises: ExerciseWithId[]) {
    this.exercisesList$.next(updatedExercises);
  }
}
