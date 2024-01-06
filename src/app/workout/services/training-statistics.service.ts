import { Injectable } from '@angular/core';
import { WorkoutFromDB } from '../models/TrainingsList.interface';
import { TrainingDetails } from '../models/TrainingDetails.type';

@Injectable({
  providedIn: 'root',
})
export class TrainingStatisticsService {
  constructor() {}

  getTrainingDetails(training: WorkoutFromDB) {
    const exercises = Object.values(training.exercises);
    let volume = 0;

    exercises.forEach((e) => {
      Object.values(e.sets).forEach((set) => {
        volume += set.reps * set.weight;
      });
    });
    return {
      trainingDate: this.transformDateFormat(training.date),
      trainingName: 'Trening Klaty',
      trainingVolume: volume,
    };
  }

  private transformDateFormat(date: string) {
    const inputDate = new Date(date);

    const day = String(inputDate.getUTCDate()).padStart(2, '0');
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
    const year = inputDate.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }
}
