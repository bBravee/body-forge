import { Component, Input } from '@angular/core';
import { concatMap, mergeMap } from 'rxjs';
import { IExerciseFromDB } from 'src/app/workout/models/IExerciseFromDB.type';
import { AddExerciseFormService } from 'src/app/workout/services/add-exercise-form.service';
import { ExercisesListService } from 'src/app/workout/services/exercises-list.service';
import { TrainingsListService } from 'src/app/workout/services/trainings-list.service';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.scss'],
})
export class ExerciseItemComponent {
  @Input() exercise: IExerciseFromDB;
  currentTrainingId: string;

  constructor(
    private trainingsListService: TrainingsListService,
    private exercisesListService: ExercisesListService,
    private addExerciseService: AddExerciseFormService
  ) {}

  protected toggleFormVisibility() {
    this.addExerciseService.toggleFormModal();
  }

  // Dopisanie ćwiczenia do listy w danym treningu użytkownika
  protected onAddExercise(exercise: IExerciseFromDB) {
    this.toggleFormVisibility();
    this.trainingsListService
      .getTrainingsListForUser()
      .pipe(
        concatMap((trainings) => {
          const keys = Object.keys(trainings);
          this.currentTrainingId = keys[keys.length - 1];
          return this.exercisesListService.addExerciseToTrainingById(
            this.currentTrainingId,
            exercise
          );
        })
      )
      .subscribe(() => {
        this.exercisesListService.getExercisesForCurrentTraining();
      });
  }
}
