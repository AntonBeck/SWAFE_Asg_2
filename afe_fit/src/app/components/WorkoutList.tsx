import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ExerciseForm from './ExerciseForm';
import Exercise from "../Models/Exercise";
import WorkoutProgram from "../Models/WorkoutProgram";

const WorkoutList: React.FC = () => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const [showProgramListFields, setShowProgramListFields] = useState(false);
  const [selectedWorkoutProgramId, setSelectedWorkoutProgramId] = useState<number | null>(null);
  const [showExerciseForm, setShowExerciseForm] = useState<boolean>(false);
  const [selectedWorkoutProgramDetails, setSelectedWorkoutProgramDetails] = useState<WorkoutProgram | null>(null);
  const [programList, setProgramList] = useState<WorkoutProgram[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setJwtToken(token);
  }, []);

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
        setProgramList(data);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error.message);
      });
  };

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

  const fshowExerciseForm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowExerciseForm(true);
  };

  const fhideExerciseForm = () => {
    setShowExerciseForm(false);
  };

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
        return data;
      } catch (error) {
        console.error('Error fetching updated workout programs:', error.message);
        throw error;
      }
    }
  };

  const handleAddExercise = async (exercise: Exercise) => {
    try {
      // Ensure there's a selected workout program
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

      // Fetch updated list of workout programs
      const updatedPrograms = await fetchUpdatedWorkoutPrograms();
      setWorkoutPrograms(updatedPrograms);

      // Close the exercise form dialog
      fhideExerciseForm();
    } catch (error) {
      console.error('Error adding exercise:', error.message);
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
        {showProgramListFields ? "Hide  Workoutlist" : "Show Workoutlist"}
      </Button>
      {showProgramListFields && (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {programList.map((workoutProgram) => (
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

      {/* Render ExerciseForm dialog */}
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
