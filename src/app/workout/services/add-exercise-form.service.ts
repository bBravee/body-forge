import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IExerciseFromDB } from '../models/IExerciseFromDB.type';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AddExerciseFormService {
  showFormModal$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private authService: AuthService) {}

  getExercises() {
    return this.http.get<IExerciseFromDB>(
      `${environment.firebase.databaseURL}/exercises.json`
    );
  }

  toggleFormModal() {
    this.showFormModal$.next(!this.showFormModal$.getValue());
    console.log(this.showFormModal$.getValue());
  }
}
