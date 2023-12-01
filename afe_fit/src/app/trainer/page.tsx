'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import createUser from '../components/CreateUser';
import CreateUser from '../components/CreateUser';

const TrainerPage = () => {

  return (
    <div className="body" style={{ 
        maxWidth: '600px', 
        margin: 'auto', 
        padding: '20px',
      }}>
        <Navbar></Navbar>
        <CreateUser></CreateUser>
    </div>
  );
};

export default TrainerPage;
