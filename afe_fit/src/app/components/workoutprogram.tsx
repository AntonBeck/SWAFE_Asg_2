// components/WorkoutProgram.tsx
import React from 'react';

const WorkoutProgram: React.FC<{
  program: WorkoutProgram;
}> = ({ program }) => {
  return (
    <div>
      <h2>{program.name}</h2>
      <p>Description: {program.description}</p>
      <p>Client: {program.clientName}</p>
      <ul>
        {program.exercises.map((exercise, index) => (
          <li key={index}>
            {exercise.name} - Sets: {exercise.sets}, Repetitions or Time: {exercise.repetitionsOrTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutProgram;
