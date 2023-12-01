'use client'
// components/ProgramList.tsx
import { useState, useEffect } from 'react';
import WorkoutProgram from '../Models/WorkoutProgram';
import WorkoutProgramComponent from './WorkoutProgramComponent';

const ProgramList: React.FC<{programs: WorkoutProgram[]}> = ({ programs }) => {
  const [selectedProgramId, setSelectedWorkoutProgramId] = useState<number | null>(null);

  const handleProgramSelection = (programId: number) => {
    setSelectedWorkoutProgramId(programId);
  };

  return (
    <div>
      <h2>Workout Programs</h2>
      <ul>
        {/* {programs.map((program) => (
          
          // <WorkoutProgramComponent key={program.workoutProgramId}
          //                          program={program}
          //                          IsSelected={program.workoutProgramId === selectedProgramId}
          //                          onClick={() => handleProgramSelection(program.workoutProgramId)}/>
        ))} */}
      </ul>
    </div>
  );
};

export default ProgramList;
