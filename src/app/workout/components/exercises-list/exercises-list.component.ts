import { Component, OnInit } from '@angular/core';
import { AddExerciseFormService } from '../../services/add-exercise-form.service';
import { BehaviorSubject, Subject, concatMap } from 'rxjs';
import { IExercise } from '../../models/IExercise.model';
import { TrainingsListService } from '../../services/trainings-list.service';
import { ExercisesListService } from '../../services/exercises-list.service';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
})
export class ExercisesListComponent implements OnInit {
  exercise: IExercise = { name: '', sets: 0, reps: 0 };
  userExercises = new BehaviorSubject<any[]>([]);

  constructor(
    private addExerciseFormService: AddExerciseFormService,
    private trainingsListService: TrainingsListService,
    private exercisesListService: ExercisesListService
  ) {}

  ngOnInit(): void {
    this.trainingsListService
      .getTrainingsListForUser()
      .pipe(
        concatMap((trainings) => {
          const currentTrainingId = Object.keys(trainings)[0];
          return this.exercisesListService.getExercisesForTraining(
            currentTrainingId
          );
        })
      )
      .subscribe((res) => {
        this.userExercises.next(Object.values(res));
        console.log(this.userExercises.getValue());
      });
  }
}
