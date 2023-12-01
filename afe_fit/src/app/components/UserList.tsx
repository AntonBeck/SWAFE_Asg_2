import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import CreateWorkoutDialog from "./CreateWorkoutDialog";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../Models/user';

const UserList: React.FC = () => {
  const [showUserListFields, setShowUserListFields] = useState(false);
  const [userList, setUserList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [jwtToken, setJwtToken] = useState<string>('');
  const [tokenDecoded, setTokenDecoded] = useState<JwtPayload | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

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

  const fetchUserList = () => {
    fetch("https://afefitness2023.azurewebsites.net/api/Users/Clients", {
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
        setUserList(data); // Set the fetched user list
      })
      .catch((error) => {
        console.error("Error fetching user list:", error.message);
      });
  };

  const handleOpenDialog = (userId: number) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateWorkout = (userId: number, workoutData: any) => {
    var dataToSend = {
      ...workoutData,
      clientId: userId,
    };
    console.log(dataToSend);
    fetch("https://afefitness2023.azurewebsites.net/api/WorkoutPrograms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        //setUserList(data); // Set the fetched user list
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error.message);
      });
    // ...
    // Close the dialog
    handleCloseDialog();
  };

  return (
    <div>
      <Button
        style={{ backgroundColor: "blue", color: "white", marginBottom: "20px" }}
        variant="contained"
        onClick={() => {
          setShowUserListFields(!showUserListFields);
          if (!showUserListFields) {
            // Fetch user list when showing user list fields
            fetchUserList();
          }
        }}
      >
        {showUserListFields ? "Hide user list" : "Show user list"}
      </Button>
      {showUserListFields && (
        <>
            <ul style={{ listStyle: "none", padding: 0 }}>
            {userList.map((user: User) => (
                <li
                key={user.userId} // Add unique key prop here
                style={{
                    border: "1px solid #ccc",
                    background: "white",
                    borderRadius: "5px",
                    padding: "10px",
                    marginBottom: "10px",
                    color: "black",
                    position: "relative",
                }}
                >
                <strong>Name:</strong> {user.firstName} {user.lastName} <br />
                <strong>Email:</strong> {user.email} <br />
                <strong>Account Type:</strong> {user.accountType}
                <Button
                    variant="contained"
                    style={{
                    backgroundColor: "green",
                    color: "white",
                    marginTop: "10px",
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    }}
                    onClick={() => handleOpenDialog(user.userId)}
                >
                    Create Workout
                </Button>
                </li>
            ))}
            </ul>
        </>
      )}
      <CreateWorkoutDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onCreateWorkout={(workoutData: any) => handleCreateWorkout(selectedUserId, workoutData)}
      />
    </div>
  );
};

export default UserList;
