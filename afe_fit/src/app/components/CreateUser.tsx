import { Button, TextField } from "@mui/material";
import { decode } from "punycode";
import React, { useState, useEffect } from "react";
import jwt, { JwtPayload } from 'jsonwebtoken';

const CreateUser: React.FC = () => {
    const [formData, setNewTrainer] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        accountType: 'Client',
      });
      const [showCreateUserFields, setShowCreateUserFields] = useState(false);
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
    
      const handleChange = (e: any) => {
        setNewTrainer({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = () => {
        console.log(tokenDecoded);
        const dataToSend = {
          ...formData,
          userId: 0,
          personaltrainerId: tokenDecoded?.UserId || 0,
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
            <form >
              <h1>Create a User</h1>
              <Button
                variant="contained"
                onClick={() => setShowCreateUserFields(!showCreateUserFields)}
                style={{ background: 'blue', color: 'white', marginBottom: '20px' }}
              >
                {showCreateUserFields ? 'Hide Create User' : 'Create User'}
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
                    style={{ background: 'white' }}
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    style={{ background: 'white' }}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    style={{ background: 'white' }}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    style={{ background: 'white' }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    style={{ backgroundColor: 'green', color: 'white', marginTop: '20px', marginBottom: '20px' }}
                  >
                    Add User
                  </Button>
                </>
              )}
          </form>
      );
}

export default CreateUser;