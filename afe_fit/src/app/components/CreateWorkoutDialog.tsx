import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CreateWorkoutDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateWorkout: (workoutData: any) => void;
}

const CreateWorkoutDialog: React.FC<CreateWorkoutDialogProps> = (props) => {
  const [jwtToken, setJwtToken] = useState<string>('');
  const [tokenDecoded, setTokenDecoded] = useState<JwtPayload | null>(null);
  const [workoutData, setWorkoutData] = useState({
    workoutProgramId: 0,
    name: "",
    description: "",
    exercises: [
      {
        name: "",
        description: "",
        sets: 0,
        repetitions: 0,
        time: "",
        personalTrainerId: 0,
      },
    ],
  });

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token !== null) {
      setJwtToken(token);
    }

    if (token) {
      try {
        const tokenDecoded = jwt.decode(token) as JwtPayload;
        setTokenDecoded(tokenDecoded);
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
  }, []);

  const handleChange = (field: string, value: string) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleExerciseChange = (index: number, field: string, value: string | number) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercises: prevData.exercises.map((exercise, i) =>
        i === index ? { ...exercise, [field]: value } : exercise
      ),
    }));
  };

  const handleCreate = () => {
    props.onCreateWorkout(workoutData);
    setWorkoutData({
      workoutProgramId: 0,
      name: "",
      description: "",
      exercises: [{ name: "", description: "", sets: 0, repetitions: 0, time: "", personalTrainerId: 0 }],
    });
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Create Workout Program</DialogTitle>
      <DialogContent>
        <TextField
          label="Workout Name"
          value={workoutData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={workoutData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          fullWidth
          margin="normal"
        />
        {workoutData.exercises.map((exercise, index) => (
          <div key={index}>
            <TextField
              label={`Exercise ${index + 1} Name`}
              value={exercise.name}
              onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label={`Exercise ${index + 1} Description`}
              value={exercise.description}
              onChange={(e) => handleExerciseChange(index, "description", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label={`Exercise ${index + 1} Sets`}
              type="number"
              value={exercise.sets}
              onChange={(e) => handleExerciseChange(index, "sets", parseInt(e.target.value, 10))}
              fullWidth
              margin="normal"
            />
            <TextField
              label={`Exercise ${index + 1} Repetitions`}
              type="number"
              value={exercise.repetitions}
              onChange={(e) => handleExerciseChange(index, "repetitions", parseInt(e.target.value, 10))}
              fullWidth
              margin="normal"
            />
            <TextField
              label={`Exercise ${index + 1} Time`}
              value={exercise.time}
              onChange={(e) => handleExerciseChange(index, "time", e.target.value)}
              fullWidth
              margin="normal"
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateWorkoutDialog;