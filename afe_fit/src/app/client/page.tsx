import React from 'react';
import { useState, useEffect } from 'react';
import WorkoutProgram from '../Models/WorkoutProgram';
import ProgramList from '../components/WorkoutProgramList';
import restService from '../services/RestService';


const clientPage = () => {
    const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);

    useEffect(() => {
        let jwtTokenDecoded = localStorage.getItem('jwtTokenDecoded');
        // restService.makeRequest("/");
    });

    return (
      <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
        <ProgramList programs={workoutPrograms}/>
      </div>
    );
  };
  
  export default clientPage;