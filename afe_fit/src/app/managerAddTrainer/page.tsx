'use client'
import React, { useEffect, useState } from 'react';
import { Button, TextField, Link } from '@mui/material';
import Navbar from '../components/navbar';

const ManagerAddTrainer = () => {
  const [formData, setNewTrainer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    accountType: 'PersonalTrainer',
  });
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setJwtToken(token);
  }, []);

  const handleChange = (e) => {
    setNewTrainer({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const dataToSend = {
      ...formData,
      userId: 0,
      personaltrainerId: 0,
    };
    console.log('Form data ', dataToSend);
    fetch('https://afefitness2023.azurewebsites.net/api/Users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Form submitted successfully:', data);
      })
      .catch((error) => {
        console.error('Error submitting the form:', error.message);
      });
  };

  return (
    <div className="body" style={{ 
        maxWidth: '600px', 
        margin: 'auto', 
        padding: '20px',
      }}><form>
        <Navbar></Navbar>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ backgroundColor: 'green', color: 'white', marginTop: '20px' }}
        >
          Add User
        </Button>
      </form>
    </div>
  );
};

export default ManagerAddTrainer;
