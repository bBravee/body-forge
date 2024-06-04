import { ExerciseSet } from './TrainingsList.type';

export type NewTraining = {
  date: string;
  exercises: {
    [id: string]: {
      muscle: string;
      name: string;
      sets: { [setId: string]: ExerciseSet };
    };
  };
};
