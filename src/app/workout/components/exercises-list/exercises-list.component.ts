import { Component, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExercisesListService } from '../../services/exercises-list.service';
import { Exercise } from '../../models/Exercise.type';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ExercisesListComponent implements OnInit {
  userExercises = new BehaviorSubject<Exercise[]>([]);
  isListEmpty: boolean;
  submitEmitter = new EventEmitter();

  constructor(
    private exercisesListService: ExercisesListService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.exercisesListService.isListEmpty$.subscribe((res) => {
      this.isListEmpty = res;
    });
    this.exercisesListService.getExercisesForCurrentTraining();
    this.updateExercisesList();
  }

  private updateExercisesList() {
    this.exercisesListService.exercisesList$.subscribe((exercises) => {
      this.userExercises.next(exercises);
      console.log(this.userExercises.getValue());
    });
  }

  private submitExercises() {
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
