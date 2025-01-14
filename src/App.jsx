import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

// Registration Component
function Registration() {
  const [users, setUsers] = useState([]);

// Fetch JSON Data (GET Request)
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      if (!response.ok) throw new Error(`Error fetching users: ${response.status}`);
      const data = await response.json();
      setUsers(data);  
    } catch (error) {
      console.error(error.message);
    }
  };

  fetchUsers();
}, []);

const handleRegister = async (event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  const newUser = { email, password}; 

// Check if email already exist
const existingUser = users.find((user) => user.email === email);
if (existingUser) {
  alert("Email already registered. Please use a different email.");
  return;
}

try {
  // POST Request to Register New User
  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

if (response.status === 201) {
  const createdUser = await response.json();
  setUsers([...users, createdUser]); // Add new user to state
  alert("Registration successful!");
} else {
  throw new Error(`Failed to register: ${response.status}`);
}
}catch (error) {
  console.error(error.message);
  alert("Error during registration. Please try again.");
}
};


  return (
    <div className="form-container">
      <h1>SIGN UP</h1>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <input type="text" name="name" placeholder="Enter your name" required />
        </div>
        <div className="input-group">
          <input type="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="input-group">
          <input type="password" name="password" placeholder="Create a password" required />
        </div>
        <div className="checkbox-container">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I accept all terms & conditions</label>
        </div>
        <button className="btn" type="submit">Register Now</button>
      </form>
      <p>Already have an account? <Link to="/login">Login now</Link></p>
    </div>
  );
}

// Login Component
function Login() {
  const [users, setUsers] = useState([]);

  // Fetch JSON Data (GET Request)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) throw new Error(`Error  fetching users: ${response.status}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    // Validate email and password
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      alert(`Welcome back, ${email}!`);
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="form-container">
      <h1>LOGIN</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input type="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="input-group">
          <input type="password" name="password" placeholder="Enter your password" required />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
        <button type="submit" className="btn">Login Now</button>
        <p>Don't have an account? <Link to="/register">Sign up now</Link></p>
      </form>
    </div>
  );
}

export default App;