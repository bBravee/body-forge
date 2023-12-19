import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExerciseDetails } from 'src/app/workout/models/ExerciseDetails.type';
import { ExercisesListService } from 'src/app/workout/services/exercises-list.service';

@Component({
  selector: 'app-exercise-list-item',
  templateUrl: './exercise-list-item.component.html',
  styleUrls: ['./exercise-list-item.component.scss'],
})
export class ExerciseListItemComponent implements OnInit {
  @Input() exercise: any;
  @Input() eventEmitter: EventEmitter<string>;
  setForm: FormGroup;
  setNumber: number = 0;

  constructor(
    private fb: FormBuilder,
    private exercisesListService: ExercisesListService
  ) {}

  ngOnInit(): void {
    console.log(this.exercise.name + ' rerender');
    this.subscribeToSubmitEmitter();
    console.log(this.exercise);
    this.setForm = this.fb.group({
      sets: this.fb.array([this.createSet()], Validators.required),
    });
  }

  subscribeToSubmitEmitter() {
    this.eventEmitter.subscribe(() => {
      this.onSubmit();
    });
  }

  addSet() {
    console.log('addSetCall');
    this.sets.push(this.createSet());
  }

  private onSubmit() {
    console.log(this.setForm.value);
    this.setForm.value.sets.forEach((element: ExerciseDetails) => {
      this.exercisesListService
        .addDetailsToExercise(element, this.exercise.id)
        .subscribe((res) => console.log(res));
    });
  }

  createSet(): FormGroup {
    return this.fb.group({
      reps: [null, Validators.required],
      weight: [null, Validators.required],
    });
  }

  get sets() {
    return this.setForm.get('sets') as FormArray;
  }
}
