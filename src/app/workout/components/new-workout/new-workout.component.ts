import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddExerciseFormService } from '../../services/add-exercise-form.service';
import { WorkoutFormComponent } from './workout-form/workout-form.component';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.scss'],
})
export class NewWorkoutComponent implements OnInit {
  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private addExerciseService: AddExerciseFormService
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
