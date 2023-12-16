import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { TrainingsList } from '../models/TrainingsList.type';

@Injectable({
  providedIn: 'root',
})
export class TrainingsListService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getTrainingsListForUser() {
    return this.http.get<TrainingsList>(
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings.json`
    );
  }
}
