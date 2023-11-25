import { Component, OnInit } from '@angular/core';
import { AddExerciseFormService } from '../../services/add-exercise-form.service';
import { Subject } from 'rxjs';
import { IExercise } from '../../models/IExercise.model';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
})
export class ExercisesListComponent implements OnInit {
  exercise: IExercise = { name: '', sets: 0, reps: 0 };

  constructor(private addExerciseFormService: AddExerciseFormService) {}

  ngOnInit(): void {
    this.addExerciseFormService.formValue$.subscribe((value) => {
      this.exercise = value;
    });
  }
}
