// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ExerciseForm from './ExerciseForm';
import Exercise from "../Models/Exercise";
import WorkoutProgram from "../Models/WorkoutProgram";

// Define the WorkoutList component
const WorkoutList: React.FC = () => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const [showProgramListFields, setShowProgramListFields] = useState(false);
  const [selectedWorkoutProgramId, setSelectedWorkoutProgramId] = useState<number | null>(null);
  const [showExerciseForm, setShowExerciseForm] = useState<boolean>(false);
  const [selectedWorkoutProgramDetails, setSelectedWorkoutProgramDetails] = useState<WorkoutProgram | null>(null);

  // useEffect to fetch JWT token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setJwtToken(token);
  }, []);

  // Function to fetch workout program list
  const fetchProgramList = () => {
    fetch("https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/trainer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setWorkoutPrograms(data);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error.message);
      });
  };

  // Function to handle box click and display exercises
  const handleBoxClick = (programId: number) => {
    if (selectedWorkoutProgramId === programId) {
      setSelectedWorkoutProgramId(null);
    } else {
      setSelectedWorkoutProgramId(programId);
      let foundProgram = workoutPrograms.find((item) => item.workoutProgramId === programId);
      setSelectedWorkoutProgramDetails(foundProgram || null);
      setShowExerciseForm(false);
    }
  };

  // Function to show the exercise form
  const fshowExerciseForm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowExerciseForm(true);
  };

  // Function to hide the exercise form
  const fhideExerciseForm = () => {
    setShowExerciseForm(false);
  };

  // Function to fetch updated workout programs
  const fetchUpdatedWorkoutPrograms = async () => {
    if (jwtToken !== null) {
      try {
        const response = await fetch('https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/trainer', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        const data = await response.json();

        setWorkoutPrograms((prevPrograms) => [...data]);
      } catch (error) {
        throw error;
      }
    }
  };

  const handleAddExercise = async (exercise: Exercise) => {
    try {
      if (!selectedWorkoutProgramDetails) {
        console.error('No selected workout program.');
        return;
      }

      const response = await fetch(`https://afefitness2023.azurewebsites.net/api/Exercises/Program/${selectedWorkoutProgramDetails.workoutProgramId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(exercise),
      });

      if (!response.ok) {
        throw new Error(`Error adding exercise. Status: ${response.status}`);
      }

      fhideExerciseForm();

      fetchUpdatedWorkoutPrograms();
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  return (
    <form>
      <Button
        style={{ backgroundColor: "blue", color: "white", marginBottom: "20px" }}
        variant="contained"
        onClick={() => {
          setShowProgramListFields(!showProgramListFields);
          if (!showProgramListFields) {
            fetchProgramList();
          }
        }}
      >
        {showProgramListFields ? "Hide Workoutlist" : "Show Workoutlist"}
      </Button>
      {showProgramListFields && (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {workoutPrograms.map((workoutProgram) => (
              <li
                key={workoutProgram.workoutProgramId}
                style={{
                  border: "1px solid #ccc",
                  background: "white",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBottom: "10px",
                  color: "black",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleBoxClick(workoutProgram.workoutProgramId)}
              >
                <div>
                  <strong>Name:</strong> {workoutProgram.name}<br />
                  <strong>Description:</strong> {workoutProgram.description} <br />
                  <strong>Client:</strong> {workoutProgram.clientId}

                  {selectedWorkoutProgramId === workoutProgram.workoutProgramId && (
                    <>
                      <strong>Exercises:</strong>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {workoutProgram.exercises?.map((exercise) => (
                          <li key={exercise.exerciseId}>
                            <strong>Exercise Name:</strong> {exercise.name} <br />
                            <strong>Description:</strong> {exercise.description} <br />
                            <strong>Repetitions:</strong> {exercise.repetitions} <br />
                            <strong>Sets:</strong> {exercise.sets} <br />
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* Add Exercise button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedWorkoutProgramDetails(workoutProgram);
                    fshowExerciseForm(e);
                  }}
                  style={{ backgroundColor: 'blue', color: 'white', marginLeft: 'auto' }}
                >
                  Add Exercise
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}

      {}
      {showExerciseForm && (
        <ExerciseForm
          onClose={fhideExerciseForm}
          onAddExercise={handleAddExercise}
        />
      )}
    </form>
  );
};

export default WorkoutList;
