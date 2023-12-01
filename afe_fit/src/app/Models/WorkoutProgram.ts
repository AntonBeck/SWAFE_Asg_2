import Exercise from "./Exercise";

interface WorkoutProgram {
    workoutProgramId: number;
    name: string | null;
    description: string | null;
    exercises: Array<Exercise> | null;
    personalTrainerId: number;
    clientId: number | null;
  }
  
  export default WorkoutProgram;