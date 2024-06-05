import { ExerciseSetWithId } from './ExerciseSetWithId.type';

export type ExerciseWithId = {
  muscle: string;
  name: string;
  sets: ExerciseSetWithId;
  id: string;
};
