import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BehaviorSubject, filter } from 'rxjs';
import { IExerciseFromDB } from 'src/app/workout/models/IExerciseFromDB.type';
import { AddExerciseFormService } from 'src/app/workout/services/add-exercise-form.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
})
export class WorkoutFormComponent {
  myForm: FormGroup;
  fetchedExercises$ = new BehaviorSubject<IExerciseFromDB[]>([]);
  initialFetchedExercises: IExerciseFromDB[];

  constructor(
    private fb: FormBuilder,
    private addExerciseFormService: AddExerciseFormService,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initialFetchedExercises = this.config.data;
    this.fetchedExercises$.next(this.config.data);
    this.filterExercises();
  }

  private initializeForm(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      sets: ['', Validators.required],
      reps: ['', Validators.required],
    });
  }

  private filterExercises() {
    this.myForm.get('name')?.valueChanges.subscribe((value) => {
      if (value === '') {
        this.fetchedExercises$.next(this.initialFetchedExercises);
      }
      const filteredData = this.fetchedExercises$
        .getValue()
        .filter((exercise) => {
          return exercise.name.toLowerCase().includes(value);
        });
      this.fetchedExercises$.next(filteredData);
    });
  }

  protected onSubmit() {
    // this.addExerciseFormService.formValue$.next(this.myForm.value);
  }
}
