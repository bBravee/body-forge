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

  getCurrentTraining() {
    return this.http
      .get<any>(
        `${environment.firebase.databaseURL}/users/${this.authService.loggedUser.uid}/trainings.json`
      )
      .pipe(
        map((res) => {
          const keys = Object.keys(res);
          const trainingKey = keys.length > 0 ? keys[keys.length - 1] : null;
          console.log(res[trainingKey!]);
          return { training: res[trainingKey!], trainingKey: trainingKey };
        })
      );
  }

  deleteTraining(id: string) {
    return this.http.delete(
      `${environment.firebase.databaseURL}/users/${this.authService.loggedUser.uid}/trainings/${id}.json`
    );
  }
}
