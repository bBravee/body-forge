import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private exercisesListService: ExercisesListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeToSubmitEmitter();
    this.setForm = this.fb.group({
      sets: this.fb.array([], Validators.required),
    });
    this.sets.valueChanges.subscribe((sets: ExerciseDetails[]) =>
      this.handleValueChanges(sets)
    );
  }

  subscribeToSubmitEmitter() {
    this.eventEmitter.subscribe(() => {
      this.onSubmit();
    });
  }

  private handleValueChanges(sets: ExerciseDetails[]): void {
    this.updateIsSomeExerciseEmptyFlag(sets);
  }

  private updateIsSomeExerciseEmptyFlag(sets: ExerciseDetails[]): void {
    const isEmpty = sets.length === 0 || sets.some(this.isExerciseDetailEmpty);
    this.exercisesListService.isSomeExerciseEmpty$.next(isEmpty);
  }

  private isExerciseDetailEmpty(set: ExerciseDetails): boolean {
    return set.reps === null || set.weight === null;
  }

  protected addSet() {
    this.sets.push(this.createSet());
  }

  protected deleteSet(id: number): void {
    this.sets.removeAt(id);
    console.log(this.sets);
  }

  protected deleteExercise() {
    this.exercisesListService
      .deleteExerciseFromTraining(this.exercise.id)
      .subscribe(() =>
        this.exercisesListService.getExercisesForCurrentTraining()
      );
  }

  private onSubmit() {
    this.setForm.value.sets.forEach((element: ExerciseDetails) => {
      this.exercisesListService
        .addDetailsToExercise(element, this.exercise.id)
        .subscribe(() => {
          this.setForm.reset();
          this.notifyExerciseListUpdate();
          this.router.navigate(['workout-main']);
        });
    });
  }

  private notifyExerciseListUpdate(): void {
    this.exercisesListService.exercisesList$.next([]);
    this.exercisesListService.isListEmpty$.next(true);
  }

  private createSet(): FormGroup {
    return this.fb.group({
      reps: [null, Validators.required],
      weight: [null, Validators.required],
    });
  }

  get sets() {
    return this.setForm.get('sets') as FormArray;
  }
}
