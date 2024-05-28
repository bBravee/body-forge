import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewTrainingService } from '../../services/new-training.service';

@Component({
  selector: 'app-workout-main',
  templateUrl: './workout-main.component.html',
  styleUrls: ['./workout-main.component.scss'],
})
export class WorkoutMainComponent implements OnInit {
  protected username: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private newTrainingService: NewTrainingService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.loggedUser.displayName;
  }

  addNewTraining() {
    this.newTrainingService.addNewTraining();
    this.router.navigate(['/new-workout']);
  }
}
