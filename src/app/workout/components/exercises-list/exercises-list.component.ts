import { Component, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExercisesListService } from '../../services/exercises-list.service';
import { NewTrainingService } from '../../services/new-training.service';
import { Exercise } from '../../models/ExerciseWithId.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
})
export class ExercisesListComponent implements OnInit {
  protected userExercises$ = new BehaviorSubject<Exercise[]>([]);
  isListEmpty: boolean;
  submitEmitter = new EventEmitter();

  constructor(
    public exercisesListService: ExercisesListService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private newTrainingService: NewTrainingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.exercisesListService.isListEmpty$.subscribe((res) => {
      this.isListEmpty = res;
    });
    this.exercisesListService.exercisesList$.subscribe((exercises) => {
      this.userExercises$.next(exercises);
      console.log(this.userExercises$.getValue());
    });
    this.updateExercisesList();
  }

  private updateExercisesList() {
    this.exercisesListService.exercisesList$.subscribe((exercises) => {
      this.userExercises$.next(exercises);
      console.log(exercises);
    });
  }

  private submitExercises() {
    this.newTrainingService
      .saveNewTraining()
      .subscribe(() => this.router.navigate(['workout-main']));
    this.submitEmitter.emit();
  }

  protected confirmSubmit(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to save?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
        this.submitExercises();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  identify(exercise: any) {
    return exercise.id;
  }
}
