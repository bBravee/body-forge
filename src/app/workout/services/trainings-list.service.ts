import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { map } from 'rxjs';
import { Training } from '../models/Training.type';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TrainingsListService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getTrainingsListForUser() {
    return this.http.get<Training[]>(
      `${environment.firebase.databaseURL}/users/${this.authService.loggedUser.uid}/trainings.json`
    );
  }

  deleteTraining(id: string) {
    return this.http.delete(
      `${environment.firebase.databaseURL}/users/${this.authService.loggedUser.uid}/trainings/${id}.json`
    );
  }
}
