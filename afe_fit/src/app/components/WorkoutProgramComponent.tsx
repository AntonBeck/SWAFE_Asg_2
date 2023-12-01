'use client'

// components/WorkoutProgram.tsx
import React from 'react';
import WorkoutProgram from '../Models/WorkoutProgram';

const WorkoutProgramComponent: React.FC<{program: WorkoutProgram, IsSelected: boolean}> = ({ program, IsSelected }) => {
  return (
    <div>
      <h2>{program.name}</h2>
      <p>Description: {program.description}</p>
      {IsSelected && (
        <ul>
          {program.exercises?.map((exercise) => (
            <div key={exercise.exerciseId}>
              <h3>{`${exercise.name ? exercise.name : "!Exercise has no name!"}`}</h3>
              <p>Description: {exercise.description}</p>
              <p>Reps/Time: {exercise.repetitions ? exercise.repetitions : exercise.time}</p>
              <p>Sets: {exercise.sets ? exercise.sets : exercise.time}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutProgramComponent;
