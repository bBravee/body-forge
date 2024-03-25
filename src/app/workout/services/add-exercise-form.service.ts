import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IExerciseFromDB } from '../models/IExerciseFromDB.type';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AddExerciseFormService {
  showFormModal$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private authService: AuthService) {}

  getExercises() {
    return this.http.get<IExerciseFromDB>(
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/exercises.json`
    );
  }

  toggleFormModal() {
    this.showFormModal$.next(!this.showFormModal$.getValue());
    console.log(this.showFormModal$.getValue());
  }
}
