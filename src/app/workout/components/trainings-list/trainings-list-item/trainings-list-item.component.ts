import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/app/workout/models/TrainingsList.interface';
import {
  ExerciseSet,
  WorkoutFromDB,
} from 'src/app/workout/models/TrainingsList.interface';

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

  ngOnInit(): void {
    console.log(this.training);
    this.trainingDate = this.training.date;
    const exercises = Object.values(this.training.exercises);
    this.exercisesList = exercises;
    console.log(exercises);
  }
}
