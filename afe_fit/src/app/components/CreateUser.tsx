import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const CreateUser: React.FC = () => {
    const [formData, setNewTrainer] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        accountType: 'Client',
      });
      const [jwtToken, setJwtToken] = useState<string | null>(null);
      const [showCreateUserFields, setShowCreateUserFields] = useState(false);
    
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
        console.log('Client creation data ', dataToSend);
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
            <form>
              <h1>Create a User</h1>
              <Button
                variant="contained"
                onClick={() => setShowCreateUserFields(!showCreateUserFields)}
                style={{ backgroundColor: 'blue', color: 'white', marginBottom: '20px' }}
              >
                {showCreateUserFields ? 'Hide User Fields' : 'Show User Fields'}
              </Button>
              {showCreateUserFields && (
                <>
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
                </>
              )}
          </form>
      );
}

export default CreateUser;