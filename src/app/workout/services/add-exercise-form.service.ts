import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IExercise } from '../models/IExercise.model';

@Injectable({
  providedIn: 'root',
})
export class AddExerciseFormService {
  formValue$ = new Subject<IExercise>();

  constructor() {}
}
