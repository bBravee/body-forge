import { Component, HostBinding, OnInit } from '@angular/core';
import { TrainingsListService } from '../../services/trainings-list.service';
import { Training } from '../../models/Training.type';

@Component({
  selector: 'app-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.scss'],
})
export class TrainingsListComponent implements OnInit {
  protected trainingsList: Training[];

  constructor(private trainingsListService: TrainingsListService) {}

  @HostBinding('style.overflow-y')
  get overflowY() {
    return this.trainingsList ? 'scroll' : 'unset';
  }

  ngOnInit(): void {
    this.trainingsListService.getTrainingsListForUser().subscribe((res) => {
      if (res) {
        this.trainingsList = Object.values(res);
      }
    });
  }
}
