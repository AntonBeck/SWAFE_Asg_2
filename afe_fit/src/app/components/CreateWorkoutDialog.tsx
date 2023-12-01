import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import jwt from 'jsonwebtoken';

const CreateWorkoutDialog = ({ open, onClose, onCreateWorkout }) => {
    const [jwtToken, setJwtToken] = useState<string | null>(null);
    const [tokenDecoded, setTokenDecoded] = useState();
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
        setJwtToken(token);
        setTokenDecoded(jwt.decode(token));
      }, []);

  const handleChange = (field, value) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleExerciseChange = (index, field, value) => {
    setWorkoutData((prevData) => ({
      ...prevData,
      exercises: prevData.exercises.map((exercise, i) =>
        i === index ? { ...exercise, [field]: value } : exercise
      ),
    }));
  };

  const handleCreate = () => {
    console.log(tokenDecoded.UserId, "USER ID");
    onCreateWorkout(workoutData);
    setWorkoutData({
        workoutProgramId: 0,
        name: "",
        description: "",
        exercises: [{ name: "", description: "", sets: 0, repetitions: 0, time: "", personalTrainerId: tokenDecoded.UserId }],
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
        <Button onClick={onClose} color="primary">
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
