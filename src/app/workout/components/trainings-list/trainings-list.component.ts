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
      }
    });
  }
}
