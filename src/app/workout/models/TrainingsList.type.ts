export type ExerciseSet = {
  reps: number;
  weight: number;
};

export type Exercise = {
  muscle: string;
  name: string;
  sets: ExerciseSet[];
};

export type Workout = {
  date: string;
  exercises: Exercise[];
};

type ExerciseSetFromDB = {
  reps: number;
  weight: number;
};

type ExerciseFromDB = {
  muscle: string;
  name: string;
  sets: Record<string, ExerciseSet>;
};

export type WorkoutFromDB = {
  date: string;
  exercises: Record<string, Exercise>;
};
