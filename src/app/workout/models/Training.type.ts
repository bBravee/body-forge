import { Exercise } from './Exercise.type';

export type Training = {
  date: string;
  exercises: Record<string, Exercise>;
};
