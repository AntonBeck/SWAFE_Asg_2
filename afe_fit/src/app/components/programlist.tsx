// components/ProgramList.tsx
import React from 'react';

const ProgramList: React.FC<{
  programs: WorkoutProgram[];
}> = ({ programs }) => {
  return (
    <div>
      <h2>Workout Programs</h2>
      <ul>
        {programs.map((program) => (
          <li key={program.id}>
            <a href={`/personal-trainer/${program.clientId}/${program.id}`}>{program.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramList;
