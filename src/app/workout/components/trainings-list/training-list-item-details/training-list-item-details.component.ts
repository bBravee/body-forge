import { Component, Input, OnInit } from '@angular/core';
import { ExerciseSet } from 'src/app/workout/models/TrainingsList.interface';

@Component({
  selector: 'app-training-list-item-details',
  templateUrl: './training-list-item-details.component.html',
  styleUrls: ['./training-list-item-details.component.scss'],
})
export class TrainingListItemDetailsComponent implements OnInit {
  @Input() sets: ExerciseSet[];
  setsArray: ExerciseSet[];

  ngOnInit(): void {
    this.setsArray = Object.values(this.sets);
  }
}
