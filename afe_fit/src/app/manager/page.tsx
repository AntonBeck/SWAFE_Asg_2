import React from 'react';
import { Link } from '@mui/material';

const ManagerPage = () => {
  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Add Trainer</h1>
      <Link href="/managerAddTrainer">Add a trainer</Link>
    </div>
  );
};

export default ManagerPage;
