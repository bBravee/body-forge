import { Component, OnInit } from '@angular/core';
import { TrainingsListService } from '../../services/trainings-list.service';
import { WorkoutFromDB } from '../../models/TrainingsList.type';

@Component({
  selector: 'app-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.scss'],
})
export class TrainingsListComponent implements OnInit {
  protected trainingsList: WorkoutFromDB[];

  constructor(private trainingsListService: TrainingsListService) {}

  ngOnInit(): void {
    this.trainingsListService.getTrainingsListForUser().subscribe((res) => {
      if (res) {
        this.trainingsList = Object.values(res);
        console.log(this.trainingsList);
      } else {
        console.log('xd');
      }

      // const exercises = Object.values(res)[0].exercises;
      // const sets = Object.values(exercises);
      // console.log(sets[0].sets);
    });
  }
}
