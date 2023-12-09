import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WorkoutFormComponent } from './workout-form/workout-form.component';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.scss'],
  providers: [DialogService],
})
export class NewWorkoutComponent {
  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}

  protected showForm() {
    this.ref = this.dialogService.open(WorkoutFormComponent, {
      header: 'Select',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });
  }
}
