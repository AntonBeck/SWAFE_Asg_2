'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import WorkoutProgram from '../Models/WorkoutProgram';
import ProgramList from '../components/WorkoutProgramList';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Navbar from '../components/navbar';

const ClientPage = () => {
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const [jwtToken, setJwtToken] = useState<string>('');
  const [tokenDecoded, setTokenDecoded] = useState<JwtPayload | null>(null);

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
        console.error('Error decoding JWT token:');
      }
    }
  }, []);
  

  useEffect(() => {
    if (tokenDecoded) {
      const token = localStorage.getItem('jwtToken');

      fetch(`https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/client/${tokenDecoded.userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: WorkoutProgram[]) => {
          setWorkoutPrograms(data);
        })
        .catch((error) => console.error('Error fetching workout programs:', error.message));
    }
  }, [tokenDecoded]);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <Navbar />
      {tokenDecoded ? <ProgramList programs={workoutPrograms} /> : <div>Loading...</div>}
    </div>
  );
};

export default ClientPage;
