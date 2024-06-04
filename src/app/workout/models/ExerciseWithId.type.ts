import { ExerciseSet } from './TrainingsList.type';

export type Exercise = {
  muscle: string;
  name: string;
  sets: { [setId: string]: ExerciseSet };
  id: string;
};
