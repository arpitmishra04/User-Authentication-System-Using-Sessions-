import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        password,
      });

      navigate("/login");

      // store the session ID in a cookie or local storage
    } catch (error) {
      setDesc(error.response.data);
      console.log(error.response.data);
    }
  }

  function handleLogin() {
    navigate("/login");
  }
  return (
    <div>
      <h1 className="signup">User Signup:</h1>
      <h1>{desc}</h1>
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
          <button type="submit">Signup</button>
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
