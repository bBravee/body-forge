import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciseSet } from 'src/app/workout/models/ExerciseSet.type';
import { ExercisesListService } from 'src/app/workout/services/exercises-list.service';
import { NewTrainingService } from 'src/app/workout/services/new-training.service';

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
    private newTrainingService: NewTrainingService
  ) {}

  ngOnInit(): void {
    console.log(this.exercise);
    this.subscribeToSubmitEmitter();
    this.setForm = this.fb.group({
      sets: this.fb.array([], Validators.required),
    });
    this.updateIsSomeExerciseEmptyFlag(this.sets.value);
    this.sets.valueChanges.subscribe((sets: ExerciseSet[]) => {
      this.newTrainingService.addSetsToExercise(this.exercise.id, sets);
      this.handleValueChanges(sets);
    });
  }

  subscribeToSubmitEmitter() {
    this.eventEmitter.subscribe(() => {
      this.onSubmit();
    });
  }

  private handleValueChanges(sets: ExerciseSet[]): void {
    this.updateIsSomeExerciseEmptyFlag(sets);
  }

  private updateIsSomeExerciseEmptyFlag(sets: ExerciseSet[]): void {
    const isEmpty = sets.length === 0 || sets.some(this.isExerciseDetailEmpty);
    this.exercisesListService.isSomeExerciseEmpty$.next(isEmpty);
  }

  private isExerciseDetailEmpty(set: ExerciseSet): boolean {
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
    const { newTraining } = this.newTrainingService;
    const exerciseId = this.exercise.id;

    if (newTraining.exercises && newTraining.exercises[exerciseId]) {
      this.newTrainingService.deleteExercise(exerciseId);
    }
  }

  private onSubmit() {
    this.exercisesListService.isFormSubmitted = true;
    this.setForm.reset({}, { emitEvent: false });
    this.notifyExerciseListUpdate();
    this.newTrainingService.resetTraining();
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
