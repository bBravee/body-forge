import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IExerciseFromDB } from '../models/IExerciseFromDB.model';

@Injectable({
  providedIn: 'root',
})
export class AddExerciseFormService {
  // formValue$ = new Subject<IExercise>();

  constructor(private http: HttpClient) {}

  getExercises() {
    return this.http.get<IExerciseFromDB>(
      'https://angular-training-app-60da2-default-rtdb.firebaseio.com/exercises.json'
    );
  }
}
