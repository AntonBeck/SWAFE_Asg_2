'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import WorkoutProgram from '../Models/WorkoutProgram';
import ProgramList from '../components/WorkoutProgramList';
import jwt from 'jsonwebtoken';

import restService from '../services/RestService';


const clientPage = () => {
    const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
    const [jwtToken, setJwtToken] = useState<string | null>(null);
    const [tokenDecoded, setTokenDecoded] = useState();

    useEffect( () => {
        const token = localStorage.getItem('jwtToken');
        setJwtToken(token);
        setTokenDecoded(jwt.decode(token));      
    }, []);

    useEffect(() => {
        if(tokenDecoded !== undefined){
            var token = localStorage.getItem('jwtToken');

            fetch(`https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/client/${tokenDecoded.UserId}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }).then((response) => {
              if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
              }
              return response.json();
            })
            .then((data: WorkoutProgram[]) => {
              setWorkoutPrograms(data);           
          }).catch((error) => console.error('Error fetching workout programs:', error.message));
        }
    }, [tokenDecoded])

    return (
      <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
        <ProgramList programs={workoutPrograms}/>
      </div>
    );
  };
  
  export default clientPage;