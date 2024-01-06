import { Component, Input, OnInit } from '@angular/core';
import { TrainingDetails } from 'src/app/workout/models/TrainingDetails.type';
import { Exercise } from 'src/app/workout/models/TrainingsList.interface';
import {
  ExerciseSet,
  WorkoutFromDB,
} from 'src/app/workout/models/TrainingsList.interface';
import { TrainingStatisticsService } from 'src/app/workout/services/training-statistics.service';

@Component({
  selector: 'app-trainings-list-item',
  templateUrl: './trainings-list-item.component.html',
  styleUrls: ['./trainings-list-item.component.scss'],
})
export class TrainingsListItemComponent implements OnInit {
  @Input() training: WorkoutFromDB;
  trainingDate: string;
  exercisesList: Exercise[];
  sets: ExerciseSet[];
  trainingDetails: TrainingDetails;

  constructor(private trainingStatisticsService: TrainingStatisticsService) {}

  ngOnInit(): void {
    this.trainingDetails = this.trainingStatisticsService.getTrainingDetails(
      this.training
    );
    const exercises = Object.values(this.training.exercises);
    this.exercisesList = exercises;
  }
}
