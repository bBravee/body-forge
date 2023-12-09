import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddExerciseFormService } from 'src/app/workout/services/add-exercise-form.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
})
export class WorkoutFormComponent {
  myForm: FormGroup;

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
