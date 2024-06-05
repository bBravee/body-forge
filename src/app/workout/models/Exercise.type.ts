import { ExerciseWithId } from './ExerciseWithId.type';

export type Exercise = Omit<ExerciseWithId, 'id'>;
