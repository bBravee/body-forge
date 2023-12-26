import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-workout-main',
  templateUrl: './workout-main.component.html',
  styleUrls: ['./workout-main.component.scss'],
})
export class WorkoutMainComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log(this.authService.loggedUser.uid);
    this.http
      .get<{ [key: string]: { id: number; name: string } }>(
        'https://angular-training-app-60da2-default-rtdb.firebaseio.com/trainings.json'
      )
      .subscribe((response) => {
        for (const i in response) {
          console.log(response[i].id);
        }
      });
  }

  addNewTraining() {
    this.http
      .post(
        `https://angular-training-app-60da2-default-rtdb.firebaseio.com/users/${this.authService.loggedUser.uid}/trainings.json`,
        {
          date: new Date(),
        }
      )
      .subscribe(() => {
        this.router.navigate(['/new-workout']);
      });
  }
}
