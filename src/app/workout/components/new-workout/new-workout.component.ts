import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddExerciseFormService } from '../../services/add-exercise-form.service';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { NavigationStart, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  filter,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { TrainingsListService } from '../../services/trainings-list.service';
import { CanDeactivateType } from '../../models/CanDeactivateType.type';
import { ExercisesListService } from '../../services/exercises-list.service';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.scss'],
})
export class NewWorkoutComponent implements OnInit {
  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private addExerciseService: AddExerciseFormService,
    private trainingsListService: TrainingsListService,
    private exercisesListService: ExercisesListService
  ) {}

  ngOnInit(): void {
    this.addExerciseService.showFormModal$.subscribe((visibility) => {
      if (visibility) {
        this.showForm();
      } else {
        this.ref?.close();
      }
    });
  }

  canDeactivate(): CanDeactivateType {
    return this.checkIfExercisesEmpty();
  }

  private checkIfExercisesEmpty() {
    return this.trainingsListService.getCurrentTraining().pipe(
      switchMap((training) => {
        if (
          !training.training.hasOwnProperty('exercises') ||
          this.exercisesListService.isSomeExerciseEmpty$.getValue()
        ) {
          return this.trainingsListService
            .deleteTraining(training.trainingKey!)
            .pipe(
              map((res) => {
                return true;
              })
            );
        } else {
          return of(true);
        }
      })
    );
  }

  protected toggleFormVisibility() {
    this.addExerciseService.toggleFormModal();
  }

  protected showForm() {
    this.addExerciseService.getExercises().subscribe((res) => {
      const exercisesArr = Object.values(res);
      this.ref = this.dialogService.open(WorkoutFormComponent, {
        header: 'Select',
        width: '80%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: exercisesArr,
      });
    });
  }
}
