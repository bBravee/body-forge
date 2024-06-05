import { Component, Input, OnInit } from '@angular/core';
import { ExerciseSet } from 'src/app/workout/models/ExerciseSet.type';
import { ExerciseSetWithId } from 'src/app/workout/models/ExerciseSetWithId.type';

@Component({
  selector: 'app-training-list-item-details',
  templateUrl: './training-list-item-details.component.html',
  styleUrls: ['./training-list-item-details.component.scss'],
})
export class TrainingListItemDetailsComponent implements OnInit {
  @Input() sets: ExerciseSetWithId;
  setsArray: ExerciseSet[];

  ngOnInit(): void {
    this.setsArray = Object.values(this.sets);
  }
}
