import React, { useState, useEffect } from "react";
import { Button, TextField, colors } from "@mui/material";

const UserList: React.FC = () => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [showUserListFields, setShowUserListFields] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setJwtToken(token);
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
        console.log("List of users:", data);
        setUserList(data); // Set the fetched user list
      })
      .catch((error) => {
        console.error("Error fetching user list:", error.message);
      });
  };

  return (
    <form>
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
            {userList.map((user) => (
              <li
                key={user.userId}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBottom: "10px",
                  color: "green",
                }}
              >
                <strong>Name:</strong> {user.firstName} {user.lastName} <br />
                <strong>Email:</strong> {user.email} <br />
                <strong>Account Type:</strong> {user.accountType}
              </li>
            ))}
          </ul>
        </>
      )}
    </form>
  );
};

export default UserList;
