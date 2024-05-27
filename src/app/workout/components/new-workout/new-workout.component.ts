import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddExerciseFormService } from '../../services/add-exercise-form.service';
import { WorkoutFormComponent } from './workout-form/workout-form.component';

import { Observable, map, of, switchMap } from 'rxjs';
import { TrainingsListService } from '../../services/trainings-list.service';
import { CanDeactivateType } from '../../models/CanDeactivateType.type';
import { ExercisesListService } from '../../services/exercises-list.service';
import { ConfirmationService } from 'primeng/api';

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
    private exercisesListService: ExercisesListService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.exercisesListService.isFormSubmitted = false;
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

  private checkIfExercisesEmpty(): Observable<boolean> {
    return this.trainingsListService.getCurrentTraining().pipe(
      switchMap((training) => {
        const isSomeExerciseEmpty =
          this.exercisesListService.isSomeExerciseEmpty$.getValue();

        if (
          !training.training.hasOwnProperty('exercises') ||
          isSomeExerciseEmpty
        ) {
          return this.deleteTraining(training.trainingKey!);
        } else if (!this.exercisesListService.isSomeExerciseEmpty$.getValue()) {
          return this.confirmAndDeleteTraining(training.trainingKey!);
        } else {
          return of(true);
        }
      })
    );
  }

  private deleteTraining(trainingKey: string): Observable<boolean> {
    return this.trainingsListService
      .deleteTraining(trainingKey)
      .pipe(map(() => true));
  }

  private confirmAndDeleteTraining(trainingKey: string): Observable<boolean> {
    if (!this.exercisesListService.isFormSubmitted) {
      return new Observable<boolean>((observer) => {
        this.confirmationService.confirm({
          message:
            'Are you sure you want to stop creating training? The changes will not be saved.',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon: 'none',
          rejectIcon: 'none',
          rejectButtonStyleClass: 'p-button-text',
          accept: () => {
            this.trainingsListService
              .deleteTraining(trainingKey)
              .pipe(
                map(() => {
                  observer.next(true);
                  observer.complete();
                })
              )
              .subscribe();
          },
          reject: () => {
            observer.next(false);
            observer.complete();
          },
        });
      });
    } else {
      return of(true);
    }
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
