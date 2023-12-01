'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import CreateUser from '../components/CreateUser';
import UserList from '../components/UserList';

const TrainerPage = () => {

  return (
    <div className="body" style={{ 
        maxWidth: '600px', 
        margin: 'auto', 
        padding: '20px',
      }}>
        <Navbar></Navbar>
        <CreateUser></CreateUser>
        <UserList></UserList>
    </div>
  );
};

export default TrainerPage;
