import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout-main',
  templateUrl: './workout-main.component.html',
  styleUrls: ['./workout-main.component.scss'],
})
export class WorkoutMainComponent implements OnInit {
  private mockObj = {
    id: 2,
    name: 'saaaaaaaaasdsa',
  };
  private testResponse: { id: number; name: string };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
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
}
