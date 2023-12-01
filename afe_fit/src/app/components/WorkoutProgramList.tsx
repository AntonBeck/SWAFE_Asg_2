'use client'
// components/ProgramList.tsx
import { useState } from 'react';
import WorkoutProgram from '../Models/WorkoutProgram';
import WorkoutProgramComponent from './WorkoutProgramComponent';

const ProgramList: React.FC<{programs: WorkoutProgram[]}> = ({ programs }) => {
  const [selectedProgramId, setSelectedWorkoutProgramId] = useState<number | null>(null);

  const handleProgramSelection = (programId: number) => {
    setSelectedWorkoutProgramId(programId);
  };

  return (
    <div           
    style={{
      border: "1px solid black",
      background: "white",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
      color: "black",
    }}>
      <h2>Workout Programs</h2>
      <ul >
        {programs.map((program, index) => (
          <WorkoutProgramComponent key={program.workoutProgramId}
                                   program={program}
                                   IsSelected={program.workoutProgramId === selectedProgramId || (programs.length === 1 && index === 0)}
                                   PassedOnClick={() => handleProgramSelection(program.workoutProgramId)}
                                   />
        ))}
      </ul>
    </div>
  );
};

export default ProgramList;
