export interface ExerciseSet {
  reps: number;
  weight: number;
}

export interface Exercise {
  muscle: string;
  name: string;
  sets: ExerciseSet[];
}

export interface Workout {
  date: string;
  exercises: Exercise[];
}

interface ExerciseSetFromDB {
  reps: number;
  weight: number;
}

interface ExerciseFromDB {
  muscle: string;
  name: string;
  sets: Record<string, ExerciseSet>;
}

export interface WorkoutFromDB {
  date: string;
  exercises: Record<string, Exercise>;
}
