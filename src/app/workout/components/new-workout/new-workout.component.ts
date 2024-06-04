import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddExerciseFormService } from '../../services/add-exercise-form.service';
import { WorkoutFormComponent } from './workout-form/workout-form.component';

import { Observable, map, of, switchMap } from 'rxjs';
import { TrainingsListService } from '../../services/trainings-list.service';
import { CanDeactivateType } from '../../models/CanDeactivateType.type';
import { ExercisesListService } from '../../services/exercises-list.service';
import { ConfirmationService } from 'primeng/api';
import { NewTrainingService } from '../../services/new-training.service';

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
    private newTrainingService: NewTrainingService,
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
    return this.confirmAndDeleteTraining();
  }

  private confirmAndDeleteTraining(): Observable<boolean> {
    if (!this.exercisesListService.isFormSubmitted && this.hasExercises()) {
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
            this.exercisesListService.exercisesList$.next([]);
            this.newTrainingService.resetTraining();
            observer.next(true);
            observer.complete();
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

  private hasExercises() {
    return this.exercisesListService.exercisesList$.getValue().length > 0;
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
