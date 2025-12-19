import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Get API URL from Environment Variables (set in GitLab/Dockerfile)
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  // State management
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from Backend
  const fetchUsers = async () => {
    // Safety check: ensure API_URL is defined
    if (!API_URL) {
      console.error("API_URL is missing! Check your Docker build args.");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Error: Could not connect to backend.");
    }
  };

  // Function to handle registration
  const handleRegister = async () => {
    if (!username || !password) {
      setMessage("Please fill in both fields.");
      return;
    }

    try {
      await axios.post(`${API_URL}/register`, { username, password });
      setMessage("Registration Successful!");
      setUsername(""); // Reset form
      setPassword(""); // Reset form
      fetchUsers();    // Refresh list
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Registration Failed! Please try again.");
    }
  };

  return (
    <div style={{ padding: "50px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#ffd24d', minHeight: '100vh' }}>
      <h1>User Management System</h1>
      
      {/* Registration Form Container */}
      <div style={{ 
          border: "1px solid #ddd", 
          padding: "25px", 
          width: "350px", 
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: '#fff'
      }}>
        <h3 style={{ marginTop: 0 }}>Register New User</h3>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Username</label>
          <input 
            type="text"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            style={{ width: "95%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Password</label>
          <input 
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{ width: "95%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <button 
          onClick={handleRegister} 
          style={{ 
            width: "100%", 
            padding: "10px", 
            backgroundColor: "#001f3f", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Register
        </button>

        {/* Status Message */}
        {message && (
          <div style={{ 
            marginTop: "15px", 
            padding: "10px", 
            borderRadius: "4px",
            backgroundColor: message.includes("Success") ? "#d4edda" : "#f8d7da",
            color: message.includes("Success") ? "#155724" : "#721c24"
          }}>
            {message}
          </div>
        )}
      </div>

      <hr style={{ margin: "40px 0", border: "0", borderTop: "1px solid #eee" }} />

      {/* Users List Section */}
      <h3>Registered Users (PostgreSQL Data)</h3>
      {users.length === 0 ? (
        <p style={{ color: "#666" }}>No users found or connecting to database...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li key={user.id} style={{ 
              background: "#f9f9f9", 
              borderBottom: "1px solid #eee", 
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              width: "350px"
            }}>
              <span style={{ fontWeight: "bold" }}>{user.username}</span>
              <span style={{ color: "#888", fontSize: "0.9em" }}>ID: {user.id}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;