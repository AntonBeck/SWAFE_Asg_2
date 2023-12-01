// components/ExerciseForm.tsx
import React, { useState } from 'react';

const ExerciseForm: React.FC<{
  onSubmit: (exercise: Exercise) => void;
}> = ({ onSubmit }) => {
  const [exercise, setExercise] = useState<Exercise>({
    name: '',
    description: '',
    sets: 0,
    repetitionsOrTime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(exercise);
    setExercise({
      name: '',
      description: '',
      sets: 0,
      repetitionsOrTime: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={exercise.name} onChange={handleChange} />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={exercise.description} onChange={handleChange} />
      </label>
      <label>
        Sets:
        <input type="number" name="sets" value={exercise.sets} onChange={handleChange} />
      </label>
      <label>
        Repetitions or Time:
        <input
          type="text"
          name="repetitionsOrTime"
          value={exercise.repetitionsOrTime}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Exercise</button>
    </form>
  );
};

export default ExerciseForm;
