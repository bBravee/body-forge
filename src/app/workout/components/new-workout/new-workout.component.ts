import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddExerciseFormService } from '../../services/add-exercise-form.service';
import { WorkoutFormComponent } from './workout-form/workout-form.component';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.scss'],
})
export class NewWorkoutComponent {
  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private addExerciseService: AddExerciseFormService
  ) {}

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
