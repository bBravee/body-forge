import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { map } from 'rxjs';
import { Training } from '../models/Training.type';

@Injectable({
  providedIn: 'root',
})
export class TrainingsListService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getTrainingsListForUser() {
    return this.http.get<Training[]>(
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings.json`
    );
  }

  getCurrentTraining() {
    return this.http
      .get<any>(
        `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings.json`
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
      `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings/${id}.json`
    );
  }
}
