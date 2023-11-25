import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddExerciseFormService } from '../../services/add-exercise-form.service';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.scss'],
})
export class NewWorkoutComponent implements OnInit {
  protected myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private addExerciseFormService: AddExerciseFormService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      sets: ['', Validators.required],
      reps: ['', Validators.required],
    });
  }

  protected onSubmit() {
    this.addExerciseFormService.formValue$.next(this.myForm.value);
  }
}
