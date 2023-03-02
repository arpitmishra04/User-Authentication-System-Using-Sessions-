import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        email,
        password,
      });
      console.log(response.data);
      navigate("/dashboard");
      // store the session ID in a cookie or local storage
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className="login">User Login:</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Username:</label>
            <input
              type="text"
              id="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
