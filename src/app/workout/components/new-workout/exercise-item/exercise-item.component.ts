import { Component, Input } from '@angular/core';
import { concatMap, mergeMap } from 'rxjs';
import { IExerciseFromDB } from 'src/app/workout/models/IExerciseFromDB.model';
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
    private exercisesListService: ExercisesListService
  ) {}

  // Dopisanie ćwiczenia do listy w danym treningu użytkownika
  protected onAddExercise(exercise: IExerciseFromDB) {
    this.trainingsListService
      .getTrainingsListForUser()
      .pipe(
        concatMap((trainings) => {
          const currentTrainingId = Object.keys(trainings)[0];
          return this.exercisesListService.addExerciseToTrainingById(
            currentTrainingId,
            exercise
          );
        })
      )
      .subscribe((res) => {
        this.exercisesListService.getExercisesForTraining(
          this.currentTrainingId
        );
      });
  }
}
